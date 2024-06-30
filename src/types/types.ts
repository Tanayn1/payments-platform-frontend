export interface PricingObject {
    price: number,
    billingPeriod: string | undefined | null,
    priceDescription: string | undefined | null,
    productType: string

}

export interface PriceIdObject {
    id: string,
    productId: string,
    storeId: string,
    currency: string,
    price: number,
    billingPeriod: string | null | undefined,
    priceType: string,
    testmode: boolean,
    createdAt: string

}

export interface ProductObject {
    id: string,
    storeId: string,
    description: string,
    testmode: boolean,
    name: string,
    imageUrl: string | null,
    createdAt: string | Date
    updatedAt: string | Date
}

export interface WebhookObject {
    
        id: string   
        testMode: boolean,
        storeId: string,
        events: Array<string>
        webhookUrl: string
      
}