using System.Data;
using Microsoft.Data.SqlClient;
using ApartmentBrokerage.Api.Models;
using System.Text.Json;

namespace ApartmentBrokerage.Api.Services
{
    public class SqlExecService
    {
        private readonly string _connStr;

        public SqlExecService(IConfiguration config)
        {
            _connStr = config.GetConnectionString("Default")
                       ?? throw new InvalidOperationException("Missing ConnectionStrings:Default");
        }

        public async Task<object> ExecAsync(ExecRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.ProcedureName))
                throw new ArgumentException("ProcedureName is required");

            using var conn = new SqlConnection(_connStr);
            await conn.OpenAsync();

            using var cmd = new SqlCommand(req.ProcedureName, conn)
            {
                CommandType = CommandType.StoredProcedure
            };

            if (req.Parameters != null)
            {
                foreach (var kv in req.Parameters)
                {
                    var name = kv.Key.StartsWith("@") ? kv.Key : "@" + kv.Key;

                    // ✅ להמיר JsonElement לטיפוס אמיתי ש-SQL מבין
                    var value = NormalizeValue(kv.Value);

                    cmd.Parameters.AddWithValue(name, value);
                }
            }

            using var reader = await cmd.ExecuteReaderAsync();

            if (!reader.HasRows)
                return new { ok = true };

            var rows = new List<Dictionary<string, object?>>();

            while (await reader.ReadAsync())
            {
                var row = new Dictionary<string, object?>();

                for (int i = 0; i < reader.FieldCount; i++)
                {
                    var colName = reader.GetName(i);
                    var colVal = await reader.IsDBNullAsync(i) ? null : reader.GetValue(i);
                    row[colName] = colVal;
                }

                rows.Add(row);
            }

            return rows;
        }

        private static object NormalizeValue(object? v)
        {
            if (v is null) return DBNull.Value;

            if (v is JsonElement je)
            {
                return je.ValueKind switch
                {
                    JsonValueKind.String => (object)(je.GetString() ?? (object)DBNull.Value),
                    JsonValueKind.Number => TryGetNumber(je),
                    JsonValueKind.True => true,
                    JsonValueKind.False => false,
                    JsonValueKind.Null => DBNull.Value,
                    _ => je.ToString() ?? (object)DBNull.Value
                };
            }

            return v;
        }

        private static object TryGetNumber(JsonElement je)
        {
            if (je.TryGetInt32(out var i)) return i;
            if (je.TryGetInt64(out var l)) return l;
            if (je.TryGetDecimal(out var d)) return d;
            if (je.TryGetDouble(out var db)) return db;
            return je.ToString() ?? "0";
        }
    }
}