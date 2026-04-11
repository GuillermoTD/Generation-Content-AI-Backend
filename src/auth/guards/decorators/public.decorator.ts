//Estos decoradores permiten marcar a las rutas para saber si son publicas o si son privadas, esto se hace para que el 
//guard de autenticación sepa si debe validar el token o no

import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic';

export const publicEndpoint = () => SetMetadata(IS_PUBLIC_KEY, true);