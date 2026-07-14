# ============================================
# Script de despliegue - t3_act8_eq13 (PowerShell)
# ============================================
# Uso: .\deploy.ps1
# Requiere: cliente OpenSSH de Windows (viene incluido en Win10/11)
# ============================================

# --- CONFIGURA ESTOS VALORES ---
$VPS_USER = "root"
$VPS_IP   = "165.22.6.118"
$EQUIPO   = "t3_act8_eq13"
$RUTA_REMOTA = "/var/www/$EQUIPO"
# --------------------------------

$ErrorActionPreference = "Stop"

Write-Host "Haciendo build de produccion..." -ForegroundColor Cyan
npm run build

Write-Host "Limpiando carpeta remota..." -ForegroundColor Cyan
ssh "$VPS_USER@$VPS_IP" "rm -rf $RUTA_REMOTA/*"

Write-Host "Subiendo archivos al VPS..." -ForegroundColor Cyan
scp -r dist/* "$VPS_USER@${VPS_IP}:$RUTA_REMOTA/"

Write-Host "Ajustando permisos en el servidor..." -ForegroundColor Cyan
ssh "$VPS_USER@$VPS_IP" "chmod -R 755 $RUTA_REMOTA"

Write-Host "Despliegue completado." -ForegroundColor Green
Write-Host "Verifica en: http://$VPS_IP/$EQUIPO" -ForegroundColor Green