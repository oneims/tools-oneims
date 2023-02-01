import React from "react";
import Button from "@/components/core/Button";
import { Input, Textarea } from "@/components/core/FormElements";

const Form = ({
  onSubmit,
  schema,
  register,
  errors,
  isDirty,
  isValid,
  isLoading,
  errorMessage,
  successMessage,
}) => {
  return (
    <>
      <form className="MODULE__form" onSubmit={onSubmit}>
        {schema?.fields.map((elem, index) => {
          const { group } = elem;
          return (
            <div key={index}>
              {group && group.length > 0 ? (
                <div className="MODULE__form__grouped-fields MODULE__form__grouped-fields-two-col">
                  {elem.group.map((elem2) => {
                    return (
                      <div className="MODULE__form__field" key={elem2.name}>
                        {elem2.element === `input` && (
                          <>
                            <Input
                              label={elem2.label}
                              name={elem2.name}
                              aria-labelledby={elem2.name}
                              autoComplete={elem2.autoComplete}
                              type={elem2.type}
                              validations={elem2.validations}
                              register={register}
                              errors={errors}
                            />
                          </>
                        )}
                        {elem2.element === `textarea` && (
                          <>
                            <Textarea
                              label={elem2.label}
                              name={elem2.name}
                              aria-labelledby={elem2.name}
                              autoComplete={elem2.autoComplete}
                              type={elem2.type}
                              validations={elem2.validations}
                              register={register}
                              errors={errors}
                            />
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="MODULE__form__field" key={elem.name}>
                  {elem.element === `input` && (
                    <>
                      <Input
                        label={elem.label}
                        id={elem.name}
                        name={elem.name}
                        aria-labelledby={elem.name}
                        autoComplete={elem.autoComplete}
                        type={elem.type}
                        placeholder={elem.placeholder}
                        validations={elem.validations}
                        register={register}
                        errors={errors}
                      />
                    </>
                  )}
                  {elem.element === `textarea` && (
                    <>
                      <Textarea
                        label={elem.label}
                        id={elem.name}
                        name={elem.name}
                        aria-labelledby={elem.name}
                        autoComplete={elem.autoComplete}
                        type={elem.type}
                        placeholder={elem.placeholder}
                        validations={elem.validations}
                        register={register}
                        errors={errors}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {schema?.button?.title && (
          <Button
            wrapperClassName="mt-4 pt-3"
            type={schema.button.type}
            className={schema.button.className + ``}
            variant={schema.button.variant}
            disabled={!isDirty || !isValid}
            isLoading={isLoading}
          >
            {schema.button.title}
          </Button>
        )}
        {errorMessage && (
          <div
            className="MODULE__form__message-error THEME__font-size-0n9 mt-5 text-center"
            role="alert"
          >
            <span>{errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div
            className="MODULE__form__message-success text-center THEME__font-size-0n9 mt-5"
            role="alert"
          >
            <div>
              <span>{successMessage}</span>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default Form;
