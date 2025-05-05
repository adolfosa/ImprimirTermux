#!/data/data/com.termux/files/usr/bin/bash

echo " _~T  Iniciando servidor Node.js..."

su <<'EOF'
export PATH=/data/data/com.termux/files/usr/bin:$PATH
cd /data/data/com.termux/files/home/Imprimir
nohup node server.js > node.log 2>&1 &

#  _~T~P Dar permisos de escritura a la impresora
chmod 666 /dev/usb/lp0

echo "PID: $!"
echo "Logs: ~/Imprimir/node.log"
exit
EOF

if grep -q "Error" ~/Imprimir/node.log 2>/dev/null; then
    echo " ]~L Error al iniciar:"
    tail -n 5 ~/Imprimir/node.log
else
    echo " \~E Servidor iniciado correctamente"
fi



