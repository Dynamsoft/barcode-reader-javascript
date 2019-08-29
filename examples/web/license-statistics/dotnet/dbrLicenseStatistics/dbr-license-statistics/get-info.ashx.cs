using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace dbrLicenseStatistics.dbr_license_statistics
{
    /// <summary>
    /// Summary description for get_info
    /// </summary>
    public class get_info : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/json";
            context.Response.Write(JsonConvert.SerializeObject(Statistics.GetInfo()));
        }

        public bool IsReusable
        {
            get
            {
                return true;
            }
        }
    }
}