/* eslint-disable @typescript-eslint/no-explicit-any */
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockApiRequestsInterceptor } from './mock-api-requests.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockApiRequestsInterceptor,
      multi: true,
    },
  ],
})

export class MockApiRequestsModule {
  /**
   * Default configuration for MockApiRequest module
   *
   * @param mockApiServices - Array of services that register mock API handlers
   * @param config - Configuration options
   * @param config.delay - Default delay value in milliseconds to apply all responses
   */
  static forRoot(
    mockApiServices: any[],
    config?: { delay?: number }
  ): ModuleWithProviders<MockApiRequestsModule> {
    return {
      ngModule: MockApiRequestsModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          deps: [...mockApiServices],
          useFactory: () => (): any => null,
          multi: true,
        }
      ],
    };
  }
}
