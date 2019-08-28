using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Timers;
using System.IO;
using Newtonsoft.Json;

namespace dbrLicenseStatistics.dbr_license_statistics
{
    public class Statistics
    {
        private const string statisticsDirName = "dbr-license-statistics/";

        public static long timeOut = 15000; // Min interval client send the record
        public static long sessionTimeOut = 300000; // 300,000ms 300s, 5min
        public static long deviceTimeOut = 30L * 24 * 3600 * 1000; // 1 month, monthly active users
        public static long recordAndGCTimeOut = 10000; // 10s

        public static object barcodeUsedLock = new object();
        public static long barcodeUsed = 0;
        public static long barcodeLimit = 10000;

        public static ConcurrentDictionary<string, long> sessionPool = new ConcurrentDictionary<string, long>();
        public static long sessionLimit = 100;

        public static ConcurrentDictionary<string, long> devicePool = new ConcurrentDictionary<string, long>();
        public static long deviceLimit = 1000;

        /*
         * Static Init:
         *   Read info if exist
         *   Read device record if exist
         *   Start the timed task
         */
        static Statistics()
        {
            // read info if exist
            var infoFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, statisticsDirName + "info.txt");
            if (File.Exists(infoFilePath))
            {
                var infoTxt = File.ReadAllText(infoFilePath);
                var info = JsonConvert.DeserializeObject<StatisticsInfo>(infoTxt);
                timeOut = info.timeOut;
                sessionTimeOut = info.sessionTimeOut;
                deviceTimeOut = info.deviceTimeOut;
                recordAndGCTimeOut = info.recordAndGCTimeOut;
                barcodeUsed = info.barcodeUsed;
                barcodeLimit = info.barcodeLimit;
                sessionLimit = info.sessionLimit;
                deviceLimit = info.deviceLimit;
            }

            // read device record if exist
            var deviceRecordFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, statisticsDirName + "device-record.txt");
            if (File.Exists(deviceRecordFilePath))
            {
                var txt = File.ReadAllText(deviceRecordFilePath);
                devicePool = JsonConvert.DeserializeObject<ConcurrentDictionary<string, long>>(txt);
            }

            // Start the timed task
            StartTimedTask();
        }

        /*
         * Get info of the the class
         */
        public static StatisticsInfo GetInfo() {
            var info = new StatisticsInfo {
                timeOut = timeOut,
                deviceTimeOut = deviceTimeOut,
                recordAndGCTimeOut = recordAndGCTimeOut,
                barcodeLimit = barcodeLimit,
                sessionCount = Statistics.sessionPool.Count,
                sessionLimit = Statistics.sessionLimit,
                deviceCount = Statistics.devicePool.Count,
                deviceLimit = Statistics.deviceLimit
            };
            lock (barcodeUsedLock) {
                info.barcodeUsed = barcodeUsed;
            }
            return info;
        }

        /*
         * Start the timed task:
         *   GC session pool
         *   GC device pool
         *   Info record
         *   Session log
         *   Device record
         */
        public static void StartTimedTask() {
            var timer = new Timer(recordAndGCTimeOut); // 10s interval
            timer.Elapsed += (source, e) => {
                var now = DateTime.UtcNow;
                var msNow = now.Ticks / 10000;

                // GC session pool
                foreach (var kv in sessionPool) {
                    if (kv.Value + sessionTimeOut < msNow) {
                        sessionPool.TryRemove(kv.Key, out long value);
                    }
                }
                
                // GC device pool
                foreach (var kv in devicePool)
                {
                    if (kv.Value + deviceTimeOut < msNow)
                    {
                        devicePool.TryRemove(kv.Key, out long value);
                    }
                }

                // Info record
                var infoFile = File.CreateText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, statisticsDirName + "info.txt"));
                var info = GetInfo();
                infoFile.Write(JsonConvert.SerializeObject(info));
                infoFile.Close();

                // Session log
                var sessionLog = File.AppendText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, statisticsDirName + "session-" + now.ToString("yyyyMMdd")+".log"));
                sessionLog.Write(now.ToString("[yyyy-MM-dd hh:mm:ss]: "));
                sessionLog.WriteLine(info.sessionCount);
                sessionLog.Close();

                // Device record
                var deviceRecordFile = File.CreateText(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, statisticsDirName + "device-record.txt"));
                deviceRecordFile.Write(JsonConvert.SerializeObject(devicePool));
                deviceRecordFile.Close();
            };
            timer.AutoReset = true;
            timer.Enabled = true;
        }
    }

    public class StatisticsInfo {
        public long timeOut;
        public long sessionTimeOut;
        public long deviceTimeOut;
        public long recordAndGCTimeOut;
        public long barcodeUsed;
        public long barcodeLimit;
        public long sessionCount;
        public long sessionLimit;
        public long deviceCount;
        public long deviceLimit;
    }
}