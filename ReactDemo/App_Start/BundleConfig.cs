using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Optimization;
using System.Web.Optimization.React;

namespace ReactDemo
{
    public static class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new JsxBundle("~/bundles/main").Include(
                // Add your JSX files here
                "~/Scripts/Tutorial.jsx"
                // You can include regular JavaScript files in the bundle too
                //"~/Content/ajax.js",
            ));

            BundleTable.EnableOptimizations = true;
        }
    }
}
