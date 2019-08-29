using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using Newtonsoft.Json.Linq;

namespace dbrLicenseStatistics.dbr_license_statistics
{
    /// <summary>
    /// Summary description for post_record
    /// </summary>
    public class post_record : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            // Get json
            var recordStr = new StreamReader(context.Request.InputStream).ReadToEnd();
            var recordJobj = JObject.Parse(recordStr);

            // Get record info
            var uuid = (string)recordJobj["uuid"];
            var counts = (long)recordJobj["counts"];
            var time = DateTime.UtcNow.Ticks / 10000; // Unit of Ticks is 100 n. Convert to unit of ms.

            // counsume barcodes
            lock (Statistics.barcodeUsedLock) {
                Statistics.barcodeUsed += counts;
            }
            // session
            Statistics.sessionPool.AddOrUpdate(uuid, time, (k, v) => { return time; });
            // device
            Statistics.devicePool.AddOrUpdate(uuid, time, (k, v) => { return time; });

        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}