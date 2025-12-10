import { Address } from 'viem';

export interface StoryConfig {
    rpcUrl: string;
    privateKey: `0x${string}`;
    chainId?: number;
}

export interface RegisterIpParams {
    metadataUri: string;
    tokenContractAddress?: Address;
    tokenId?: string;
}

export interface CreateLicenseParams {
    type: 'non-commercial' | 'commercial';
    commercialRevShare?: number; // percentage 0-100
}

export interface AttachLicenseParams {
    ipId: Address;
    licenseTemplate?: Address;
    licenseTermsId: string;
}

export interface MintLicenseParams {
    ipId: Address;
    licenseTemplate?: Address;
    licenseTermsId: string;
    amount: number;
    receiver: Address;
}
