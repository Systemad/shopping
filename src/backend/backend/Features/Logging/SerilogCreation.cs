using Serilog;
using Serilog.Events;
using Serilog.Extensions.Hosting;

namespace backend.Features.Logging;

public static class SerilogCreation
{
    public static ReloadableLogger CreateSerilogConfiguration()
    {
        return new LoggerConfiguration()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .Enrich.FromLogContext()
            .WriteTo.Console()
            .CreateBootstrapLogger();
    }
}