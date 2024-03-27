import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { provideAuth,getAuth } from '@angular/fire/auth'
import {provideFirestore, getFirestore} from '@angular/fire/firestore'
import {provideStorage,getStorage} from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { firebase } from './config/firebase';

// import { from} from '@angular/forms'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(reducers, { metaReducers }), provideHttpClient(), provideEffects(), provideAnimations(), importProvidersFrom([
    provideFirebaseApp(() => initializeApp(firebase)),
    provideAuth(()=>getAuth()),
    provideFirestore(()=> getFirestore()),
    provideStorage(()=> getStorage())
  ]), provideAnimationsAsync()]
};

