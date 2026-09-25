# Integración de Supabase

## 1. Dependencias

El proyecto usa `@supabase/supabase-js` y Vite:

```bash
npm install
```

## 2. Variables de entorno

Copiá `.env.example` a `.env` y completá:

```env
VITE_SUPABASE_URL=https://TU_PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anon_o_publishable
VITE_SUPABASE_STORAGE_BUCKET=loop-avatars
VITE_SUPABASE_REDIRECT_URL=http://localhost:5173/supabase-auth.html
```

Nunca uses una clave `service_role` en el navegador.

## 3. Base de datos y Storage

Ejecutá `supabase/schema.sql` desde **Supabase → SQL Editor**. El script crea:

- Bucket público `loop-avatars`
- Tabla `profiles`
- Políticas RLS para que cada usuario administre sus propios archivos
- Trigger para crear el perfil después del registro

Si preferís otro bucket, cambialo también en `VITE_SUPABASE_STORAGE_BUCKET` y en las políticas SQL.

## 4. Ejecutar

```bash
npm run dev
```

Abrí `http://localhost:5173/supabase-auth.html`.

Para generar el bundle:

```bash
npm run build
```

La salida queda en `supabase-dist/`. Para GitHub Pages, publicá esa salida o configurá el flujo de build para desplegar el directorio generado.

## 5. Permisos necesarios

- URL del proyecto Supabase.
- Clave anon/publishable (pública para el navegador).
- Permiso para ejecutar `supabase/schema.sql` en el proyecto.
- Crear o habilitar el bucket `loop-avatars`.
- Configurar la URL de redirección de autenticación en Supabase.
