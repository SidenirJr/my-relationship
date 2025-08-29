#!/bin/sh
set -e

# Aguarda o MySQL estar pronto
echo "Aguardando MySQL..."
sleep 10

# Gera o cliente Prisma
echo "Gerando cliente Prisma..."
npx prisma generate

# Pula as migrações por enquanto devido a problemas com OpenSSL
echo "Pulando migrações do Prisma devido a problemas de compatibilidade..."

# Inicia a aplicação
echo "Iniciando a aplicação..."
exec "$@"