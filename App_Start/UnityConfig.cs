using Microsoft.Practices.Unity;
using System.Web.Http;
using ReactPokedex.Interfaces;
using ReactPokedex.Services;
using Unity.WebApi;

namespace ReactPokedex
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            container.RegisterType<IPokemonService, PokemonService>();
            container.RegisterType<ICacheProvider, CacheProvider>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}