/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddActivityDto } from '../models/AddActivityDto';
import type { GetActivityDto } from '../models/GetActivityDto';
import type { UpdateActivityDto } from '../models/UpdateActivityDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ActivityService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns GetActivityDto Success
     * @throws ApiError
     */
    public getActivity(): CancelablePromise<GetActivityDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/Activity',
        });
    }
    /**
     * @param requestBody
     * @returns GetActivityDto Success
     * @throws ApiError
     */
    public postActivity(
        requestBody?: AddActivityDto,
    ): CancelablePromise<GetActivityDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/Activity',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns GetActivityDto Success
     * @throws ApiError
     */
    public putActivityComplete(
        id: number,
    ): CancelablePromise<GetActivityDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/Activity/Complete/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns GetActivityDto Success
     * @throws ApiError
     */
    public putActivity(
        id: number,
        requestBody?: UpdateActivityDto,
    ): CancelablePromise<GetActivityDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/Activity/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public deleteActivity(
        id: number,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/Activity/{id}',
            path: {
                'id': id,
            },
        });
    }
}
