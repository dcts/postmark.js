import {Promise} from "bluebird";
import BaseClient from './BaseClient';

import {
    HttpMethod,
    ClientOptions,
    DefaultHeaderNames,
    QueryStringParameters,
    PostmarkErrors,
    PostmarkCallback,
    DefaultResponse,
} from './models';

import {

    Server,
    ServerOptions,
    Servers,

    Domain,
    DomainOptions,
    Domains,
    DomainDetails,

    Signatures,
    SignatureDetails,
    SignatureOptions,
    BaseSignatureOptions
} from './models'

export default class AccountClient extends BaseClient {

    /**
     * Create a new AccountClient
     * @param accountToken The account token that should be used with requests.
     * @param options Various options to customize client behavior.
     */
    constructor(accountToken: string, options?: ClientOptions) {
        super(accountToken, DefaultHeaderNames.ACCOUNT_TOKEN, options);
    }

    /**
     * Retrieve a list of Servers.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getServers(filter: QueryStringParameters = {}, callback?:PostmarkCallback<Servers>) : Promise<Servers> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(HttpMethod.GET, '/servers', filter, callback);
    };

    /**
     * Retrieve a single server by ID.
     *
     * @param id - The ID of the Server for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getServer(id: number, callback?: PostmarkCallback<Server>): Promise<Server> {
        return this.processRequestWithoutBody(HttpMethod.GET, `/servers/${id}`, {}, callback);
    };

    /**
     * Create a new Server.
     *
     * @param options - The options to be used to create new Server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    createServer(options: ServerOptions, callback?: PostmarkCallback<Server>): Promise<Server> {
        return this.processRequestWithBody(HttpMethod.POST, '/servers', options, callback);
    };

    /**
     * Modify the Server associated with this Client.
     *
     * @param id - The ID of the Server you wish to update.
     * @param options - The options to be used to create new Server.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    editServer(id: number, options: ServerOptions, callback?: PostmarkCallback<Server>): Promise<Server> {
        return this.processRequestWithBody(HttpMethod.PUT, `/servers/${id}`, options, callback);
    };

    /**
     * Modify the Server associated with this Client.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    deleteServer(id:number, callback?: PostmarkCallback<DefaultResponse>): Promise<DefaultResponse> {
        return this.processRequestWithoutBody(HttpMethod.DELETE, `/servers/${id}`, {}, callback);
    };

    /**
     * Retrieve a batch of Domains.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getDomains(filter: QueryStringParameters = {}, callback?:PostmarkCallback<Domains>) : Promise<Domains> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(HttpMethod.GET, '/domains', filter, callback);
    };

    /**
     * Retrieve a single Domain by ID.
     *
     * @param id - The ID of the Domain for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getDomain(id:number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(HttpMethod.GET, `/domains/${id}`, {}, callback);
    };

    /**
     * Create a new Domain.
     *
     * @param options - The options to be used to create new Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    createDomain(options: DomainOptions, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithBody(HttpMethod.POST, '/domains/', options, callback);
    };

    /**
     * Update a Domain.
     *
     * @param id - The ID of the Domain you wish to update.
     * @param domain - The values on the Domain you wish to update.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    editDomain(id: number, options: DomainDetails, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithBody( HttpMethod.PUT, `/domains/${id}`, options, callback);
    }

    /**
     * Delete a Domain.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param options - The options to be used in create Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    deleteDomain(id: number, callback?:PostmarkCallback<DefaultResponse>) : Promise<DefaultResponse> {
        return this.processRequestWithoutBody(HttpMethod.DELETE, `/domains/${id}`, {}, callback);
    };

    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    verifyDomainDKIM(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(HttpMethod.PUT, `/domains/${id}/verifyDKIM`, {}, callback);
    }

    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    verifyDomainReturnPath(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody( HttpMethod.PUT, `/domains/${id}/verifyReturnPath`, {}, callback);
    }

    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    verifyDomainSPF(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(HttpMethod.PUT, `/domains/${id}/verifySPF`, {}, callback);
    }

    /**
     * Trigger Domain DKIM key verification.
     *
     * @param id - The ID of the Domain you wish to trigger DKIM verification for.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    rotateDomainDKIM(id: number, callback?:PostmarkCallback<DomainDetails>) : Promise<DomainDetails> {
        return this.processRequestWithoutBody(HttpMethod.PUT, `/domains/${id}/rotateDKIM`, {}, callback);
    }

    /**
     * Retrieve a single Sender Signature by ID.
     *
     * @param id - The ID of the Sender Signature for which you wish to retrieve details.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getSenderSignature(id: number, callback?:PostmarkCallback<SignatureDetails>) : Promise<SignatureDetails> {
        return this.processRequestWithoutBody(HttpMethod.GET, `/senders/${id}`, {}, callback);
    };

    /**
     * Retrieve a batch of Sender Signatures.
     *
     * @param filter - An optional filter for which data is retrieved.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    getSenderSignatures(filter: QueryStringParameters = {}, callback?:PostmarkCallback<Signatures>) : Promise<Signatures> {
        filter = {...{count: 100, offset: 0},...filter};
        return this.processRequestWithoutBody(HttpMethod.GET, '/senders', filter, callback);
    };

    /**
     * Create a new Sender Signature.
     *
     * @param options - The options to be used to create new Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    createSenderSignature(options: SignatureOptions, callback?:PostmarkCallback<SignatureDetails>) : Promise<SignatureDetails> {
        return this.processRequestWithBody(HttpMethod.POST, '/senders/', options, callback);
    };


    /**
     * Update a Sender Signature.
     *
     * @param id - The ID of the Sender Signature for which you wish to update.
     * @param options - The values on the Sender Signature you wish to update.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    editSenderSignature(id: number, options: BaseSignatureOptions, callback?:PostmarkCallback<SignatureDetails>) : Promise<SignatureDetails> {
        return this.processRequestWithBody(HttpMethod.PUT, `/senders/${id}`, options, callback);
    };

    /**
     * Delete a Domain.
     *
     * @param id - The ID of the Domain you wish to delete.
     * @param options - The options to be used in create Domain.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    deleteSenderSignature(id: number, callback?:PostmarkCallback<DefaultResponse>) : Promise<DefaultResponse> {
        return this.processRequestWithoutBody(HttpMethod.DELETE, `/senders/${id}`, {}, callback);
    };

    /**
     * Request a new confirmation email to be sent to the email address associated with a Sender Signature.
     *
     * @param id - The ID of the Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    resendSenderSignatureConfirmation(id: number, callback?:PostmarkCallback<DefaultResponse>) : Promise<DefaultResponse> {
        return this.processRequestWithoutBody(HttpMethod.POST, `/senders/${id}/resend`, {}, callback);
    };

    /**
     * Request that the SPF records for Sender Signature be verified.
     *
     * @param id - The ID of the Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    verifySenderSignatureSPF(id: number, callback?:PostmarkCallback<SignatureDetails>) : Promise<SignatureDetails> {
        return this.processRequestWithoutBody(HttpMethod.POST, `/senders/${id}/verifySpf`, {}, callback);
    };


    /**
     * Request that the SPF records for Sender Signature be verified.
     *
     * @param id - The ID of the Sender Signature.
     * @param callback - If the callback is provided, it will be passed to the resulting promise as a continuation.
     * @returns A promise that will complete when the API responds (or an error occurs).
     */
    requestNewDKIMForSenderSignature(id: number, callback?:PostmarkCallback<SignatureDetails>) : Promise<SignatureDetails> {
        return this.processRequestWithoutBody(HttpMethod.POST, `/senders/${id}/requestNewDkim`, {}, callback);
    };
}