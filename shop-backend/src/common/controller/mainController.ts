import { Request, ResponseToolkit } from '@hapi/hapi';
import {
  replyError,
  RequestHelper,
  sendResponse,
  performance,
} from '@thinkcove-lib/base';

// Defines the shape of the business logic function to be injected into the controller
export type BusinessLogicFn = (helper: RequestHelper) => Promise<any>;

/**
 * Controller wrapper that standardizes request handling:
 * - Initializes RequestHelper for extracting request data
 * - Executes the provided business logic
 * - Handles success and error responses consistently
 * - Measures and logs performance timing for each request
 *
 * @param businessLogic - Async function containing your route-specific logic
//  * @returns Hapi-compatible route handler
 */
export const controller = (businessLogic: BusinessLogicFn) => {
  return async (request: Request, h: ResponseToolkit) => {
    // Start performance tracking for the current request

    const routeDescription =
      request.route.settings?.description || 'unknown route';
    const perf = performance(
      `${request.method.toUpperCase()} - ${routeDescription}`,
    );

    try {
      const result = await businessLogic(new RequestHelper(request));
      return sendResponse(h, result);
    } catch (err: any) {
      return replyError(err);
    } finally {
      perf.stop(); // Log duration or performance metrics
    }
  };
};
