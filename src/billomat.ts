// Since Billomat has names that we cannot alter, suppress some of our eslint rules in this file.
/* eslint-disable @typescript-eslint/naming-convention,id-blacklist */
import { BILLOMAT_RESOURCE_NAMES } from './get-billomat-api-client';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Billomat {

    export type ResourceName = typeof BILLOMAT_RESOURCE_NAMES[number];

    export interface Resource {
        id?: string;
    }

    export interface Article extends Resource {
        created?: string;
        updated?: string;
        archived?: string;
        unit_id?: string;
        article_number?: string;
        number?: string;
        number_pre?: string;
        number_length?: string;
        type?: string;
        title?: string;
        description?: string;
        sales_price?: string;
        sales_price2?: string;
        sales_price3?: string;
        sales_price4?: string;
        sales_price5?: string;
        currency_code?: string;
        tax_id?: string;
        revenue_account_number?: string;
        cost_center?: string;
        purchase_price?: string;
        purchase_price_net_gross?: string;
        supplier_id?: string;
        customfield?: string;
        'article-property-values'?: {
            'article-property-value': ArticlePropertyValue | ArticlePropertyValue[];
        };
    }

    export interface ArticlePropertyValue extends Resource {
        article_id: string;
        article_property_id: string;
        type?: string;
        name?: string;
        value: string;
        customfield?: string;
    }

    export interface Client extends Resource {
        created?: string;
        updated?: string;
        archived?: string;
        dig_exclude?: string;
        client_number?: string;
        number?: string;
        number_pre?: string;
        number_length?: string;
        name?: string;
        salutation?: string;
        first_name?: string;
        last_name?: string;
        street?: string;
        zip?: string;
        city?: string;
        state?: string;
        country_code?: string;
        address?: string;
        phone?: string;
        fax?: string;
        mobile?: string;
        email?: string;
        www?: string;
        tax_number?: string;
        vat_number?: string;
        bank_account_owner?: string;
        bank_number?: string;
        bank_name?: string;
        bank_account_number?: string;
        bank_swift?: string;
        bank_iban?: string;
        currency_code?: string;
        enable_customerportal?: string;
        default_payment_types?: string;
        sepa_mandate?: string;
        sepa_mandate_date?: string;
        locale?: string;
        tax_rule?: string;
        net_gross?: string;
        price_group?: string;
        debitor_account_number?: string;
        reduction?: string;
        discount_rate_type?: string;
        discount_rate?: string;
        discount_days_type?: string;
        discount_days?: string;
        due_days_type?: string;
        due_days?: string;
        reminder_due_days_type?: string;
        reminder_due_days?: string;
        offer_validity_days_type?: string;
        offer_validity_days?: string;
        dunning_run?: string;
        note?: string;
        revenue_gross?: string;
        revenue_net?: string;
        customfield?: string;
        'client-property-values'?: {
            'client-property-value': ClientPropertyValue | ClientPropertyValue[];
        };
    }

    export interface ClientPropertyValue extends Resource {
        client_id: string;
        client_property_id: string;
        type?: string;
        name?: string;
        value: string;
        customfield?: string;
    }

    export interface Invoice extends Resource {
        created?: string;
        updated?: string;
        client_id?: string;
        contact_id?: string;
        invoice_number?: string;
        number?: string;
        number_pre?: string;
        number_length?: string;
        title?: string;
        date?: string;
        supply_date?: string;
        supply_date_type?: string;
        due_date?: string;
        due_days?: string;
        address?: string;
        status?: string;
        label?: string;
        intro?: string;
        note?: string;
        'invoice-items'?: {
            'invoice-item': InvoiceItem | InvoiceItem[];
        };
        total_net?: string;
        total_gross?: string;
        reduction?: string;
        total_reduction?: string;
        total_net_unreduced?: string;
        total_gross_unreduced?: string;
        currency_code?: string;
        quote?: string;
        net_gross?: string;
        discount_rate?: string;
        discount_date?: string;
        discount_days?: string;
        discount_amount?: string;
        paid_amount?: string;
        open_amount?: string;
        payment_types?: string;
        taxes?: {
            tax?: {
                name?: string;
                rate?: string;
                amount?: string;
                amount_plain?: string;
                amount_rounded?: string;
                amount_net?: string;
                amount_net_plain?: string;
                amount_net_rounded?: string;
                amount_gross?: string;
                amount_gross_plain?: string;
                amount_gross_rounded?: string;
            };
        };
        invoice_id?: string;
        offer_id?: string;
        confirmation_id?: string;
        recurring_id?: string;
        dig_proceeded?: string;
        template_id?: string;
        customfield?: string;
    }

    export interface InvoiceItem extends Resource {
        article_id?: string;
        invoice_id?: string;
        position?: string;
        unit?: string;
        quantity?: string;
        type?: string;
        unit_price?: string;
        tax_name?: string;
        tax_rate?: string;
        title?: string;
        description?: string;
        total_net?: string;
        total_gross?: string;
        reduction?: string;
        total_net_unreduced?: string;
        total_gross_unreduced?: string;
        customfield?: string;
    }

    export interface ConfirmationItem extends Resource {
        confirmation_id: string;
        article_id?: string;
        unit?: string;
        quantity?: number;
        unit_price?: number;
        tax_name?: string;
        tax_rate?: number;
        title?: string;
        description?: string;
        reduction?: string;
    }

    export type InitialConfirmationItem = Omit<ConfirmationItem, 'confirmation_id'>;

    export interface Confirmation extends Resource {
        client_id: string;
        contact_id?: number;
        address?: string;
        number_pre?: string;
        number?: number;
        number_length?: number;
        date?: string;
        title?: string;
        label?: string;
        intro?: string;
        note?: string;
        reduction?: string;
        currency_code?: string;
        net_gross?: string;
        quote?: number;
        offer_id?: number;
        free_text_id?: number;
        template_id?: number;
        'confirmation-items'?: {
            'confirmation-item': InitialConfirmationItem | InitialConfirmationItem[];
        };
    }
}
