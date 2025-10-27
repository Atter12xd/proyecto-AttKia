@echo off
echo ================================================================
echo     🤖 ATTKIA AI COMMERCE - Iniciando sitio web...
echo ================================================================
echo.

REM Verificar si node_modules existe
if not exist "node_modules\" (
    echo 📦 Instalando dependencias por primera vez...
    echo.
    call npm install
    echo.
)

echo ✅ Dependencias listas!
echo.
echo 🚀 Iniciando servidor de desarrollo...
echo.
echo 📍 El sitio se abrirá en: http://localhost:3000
echo.
echo ⚠️  Para detener el servidor, presiona Ctrl+C
echo.
echo ================================================================

call npm run dev

pause



