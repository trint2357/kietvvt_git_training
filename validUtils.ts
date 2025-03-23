export interface ValidOptions {
  requiredText?: boolean;
  requiredValue?: boolean;
}

export class ValidUtils {
  static readonly DEFAULT_OPTIONS: ValidOptions = {
    requiredText: false,
    requiredValue: false,
  };

  build = (
    options: ValidOptions = ValidUtils.DEFAULT_OPTIONS,
    additionRules: any[] = []
  ): any[] => {
    const optionRules = [];
    const finalOptions = { ...ValidUtils.DEFAULT_OPTIONS, ...options };
    // Rule for string input
    if (finalOptions.requiredText) {
      optionRules.push({
        required: true,
        whitespace: true,
        message: "This field is required",
      });
    }
    // Rule for all input
    if (finalOptions.requiredValue) {
      optionRules.push({
        required: true,
        message: "This field is required",
      });
    }

    return optionRules.concat(additionRules);
  };
}

export const validUtils = new ValidUtils();
