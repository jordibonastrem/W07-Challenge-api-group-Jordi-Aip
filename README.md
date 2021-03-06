Create DB w/collections:

- USERS:
  --field indicating whether its ADMIN or NOTADMIN
  --field to save SEEN SERIES
  --ID
  --USERNAME
  --platforms

- PLATFORMS:
  -- ID
  -- NAME

- SERIES:
  -- ID
  -- NAME
  -- field saying SEEN/NOTSEEN
  -- platform

---

Series API
Construye una API REST que permita gestionar un listado de series vistas. La API tiene que manejar las siguientes entidades:

Usuarios
Plataformas
Series
Cada usuario tendrá (además de lo que creas conveniente), un campo indicando si es administrador o no y un campo que almacenará las series que ha visto.

Cada serie pertenece a una plataforma y tendrá (además de lo que creas conveniente) un campo que indicará si el usuario la ha visto o no.

Enpoints (todos están protegidos por JWT menos los que se indiquen como abiertos):

jordi -schema [POST] /users/login: endpoint abierto, para iniciar sesión

jordi [POST] /users/register: endpoint abierto, para crear un usuario (register) -- mira el body de la request y pasa el joi (examina el body y comprueba el "formato"), busca el usuario en el body , creará un usuario en la base de datos y emite una response con status 201, sino manda un error al middleware de errores.

[GET] /platforms: lista todas las plataformas

[POST] /platforms: para crear una nueva plataforma (sólo administrador)

[PUT] /platforms/:idPlatform : para actualizar una plataforma (sólo administrador)

[DELETE] /platforms/:idPlatform : para borrar una plataforma (sólo administrador)

ok [GET] /series: lista todas las series del usuario, vistas o no

[GET] /series/viewed: lista todas las series del usuario ya vistas

[GET] /series/pending: lista todas las series del usuario no vistas

ok -joi ok [POST] /series: para crear una nueva serie - busca en header un auth

ok [PUT] /series/:idSerie : para actualizar una serie

ok [DELETE] /series/:idSerie : para borrar una serie

[PATCH] /series/view/:idSerie : para marcar una serie como vista

Valida todas las requests necesarias con Joi
Haz tests unitarios de todos los middlewares
Haz tests de integración de todos los endpoints
