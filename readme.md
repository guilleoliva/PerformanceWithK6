# Framework de Pruebas de Performance con k6

## Visión General
Framework completo para pruebas de carga que:
✔ Carga `global_ids` desde archivos CSV  
✔ Ejecuta pruebas contra endpoints de Tinybird  
✔ Genera reportes HTML interactivos  
✔ Integra con Datadog para monitoreo

## 🚀 Instalación Rápida

```bash
git clone https://github.com/guilleoliva/PerformanceWithK6.git
cd PerformanceWithK6
npm install
cp .env.example .env
```

Estructura de Archivos
```text
📦 PerformanceWithK6
├── 📂 data
│   └── global_ids.csv       # IDs para testing
├── 📂 src
│   ├── config.js            # Configs de entorno
│   ├── main.js              # Script principal
│   └── scenarios/           # Escenarios de prueba
└── 📂 reports               # Reportes generados
```

🔧 Uso Básico

Comando	Descripción

```
npm run test:smoke	Prueba rápida (5 usuarios)
npm run test:load	Prueba de carga (50 usuarios)
npm run report	Genera reporte HTML
```

Ejemplo con Datadog:

```bash
DATADOG_API_KEY=tu_key npm run test:load
```

📊 Métricas Clave

1. Tiempo de respuesta (p95 < 500ms)
2. Tasa de error (<1%)
3Requests por segundo

🛠 Personalización

1. Agregar nuevos escenarios en src/scenarios/
2. Modificar umbrales en src/config.js:

```js
export const ENVIRONMENTS = {
load: {
    vus: 50,          // Usuarios virtuales
    duration: '5m',   // Duración
    thresholds: {
        http_req_duration: ['p(95)<500']
    }
   }
};
```

📌 Mejores Prácticas

1. Iniciar siempre con smoke tests
2. Monitorear Datadog en tiempo real
3. Versionar los datos de prueba
4. Archivar reportes HTML para comparativas

💡 Tip: Usa el archivo data/global_ids.csv para gestionar distintos conjuntos de datos de prueba.