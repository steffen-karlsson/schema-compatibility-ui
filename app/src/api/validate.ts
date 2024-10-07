import {
  CompatibilityLevel,
  Configuration,
  SchemaCompatibilityApi,
  SchemaCompatibilitySubject,
  SchemaType,
} from 'generated-sources';
import { b64dec } from 'lib/b64';
import {
  SCHEMA_COMPATIBILITY_LEVEL,
  SCHEMA_EXISTING,
  SCHEMA_PROPOSED,
  SCHEMA_TYPE,
} from 'storage/const';

import { BASE_PARAMS } from './const';

interface FailedMessageContent {
  errorType: string;
  description: string;
  additionalInfo: string;
}

export interface ValidateResponse {
  isCompatible: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  title: string;
  message: string;
}

export interface ResponseError {
  error: string;
  message: string;
  status: number;
}

export async function validate(): Promise<ValidateResponse> {
  const validationApi = new SchemaCompatibilityApi(
    new Configuration(BASE_PARAMS)
  );
  const req: SchemaCompatibilitySubject = {
    schemaType: localStorage.getItem(SCHEMA_TYPE) as SchemaType,
    compatibilityLevel: localStorage.getItem(
      SCHEMA_COMPATIBILITY_LEVEL
    ) as CompatibilityLevel,
    existingSchema: b64dec(localStorage.getItem(SCHEMA_EXISTING) as string),
    proposedSchema: b64dec(localStorage.getItem(SCHEMA_PROPOSED) as string),
  };
  return new Promise((resolve) => {
    validationApi
      .compareSchemas({
        schemaCompatibilitySubject: req,
      })
      .then((data) => {
        const errors: ValidationError[] = data.errors
          .slice(0, data.errors.length === 1 ? 1 : -1)
          .map((error) => {
            const errorMessage: FailedMessageContent = JSON.parse(error);
            return {
              title: `Validation failed: ${errorMessage.errorType}`,
              message: `${errorMessage.description}, ${errorMessage.additionalInfo}`,
            };
          });

        resolve({
          isCompatible: data.isCompatible,
          errors: data.isCompatible ? [] : errors,
        });
      })
      .catch((error) => {
        // Nasty typescript hack to unbox the error message body
        error.json().then((data: ResponseError) => {
          resolve({
            isCompatible: false,
            errors: [
              {
                title: `Error ${data.status}`,
                message: data.message,
              },
            ],
          });
        });
      });
  });
}
