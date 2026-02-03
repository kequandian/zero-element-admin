interface FormData {
  formViewType?: string;
  fieldViewOneManyOptions?: string;
  [key: string]: any;
}

/**
 * Cleans form data by removing one-many options if formViewType is not 'one-mary'
 */
export default function cleanFormRateData(formData: FormData): FormData {
  if (formData.formViewType !== 'one-mary') {
    formData.fieldViewOneManyOptions = ''
  }

  return formData
}
