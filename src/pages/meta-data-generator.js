import React, { useState, useEffect, useRef } from "react";
import Dashboard from "@/components/wrappers/Dashboard";
import Spinner from "@/components/core/Spinner";
import Section from "@/components/wrappers/Section";
import Container from "@/components/wrappers/Container";
import Form from "@/components/core/Form";
import { useForm } from "react-hook-form";
import { Schema__Form__MetaDataGenerator, Schema__Generic_Variables } from "@/lib/Schema";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import Button from "@/components/core/Button";
import { validateURL } from "@/lib/Helpers";

const MetaDataGenerator = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: `all`,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [globalTitleSuffix, setGlobalTitleSuffix] = useState(null);
  const [renderResultsView, setRenderResultsView] = useState(false);
  const [regenerationAtWork, setRegenerationAtWork] = useState(false);
  const [requestData, setRequestData] = useState({
    numberOfUrls: 0,
    isLoading: false,
    data: [],
  });

  const validateURLs = (arr) => {
    if (arr.length > 20) return false;
    for (let i = 0; i < arr.length; i++) {
      if (!validateURL(arr[i])) return false;
    }
    return true;
  };

  const onSubmit = (data) => {
    const { urls, metaTitleSuffix } = data;
    setErrorMessage(null);
    const arr = urls.split("\n").filter((n) => n);
    const isValidatedRequest = validateURLs(arr);
    if (!isValidatedRequest) {
      setErrorMessage(
        `Lines entered: ${arr.length} -- Please verify that not more than 20 lines are added and each line is a valid URL with http:// or https://`
      );
      return false;
    }
    setGlobalTitleSuffix(metaTitleSuffix);
    setRenderResultsView(true);
    const results = document.querySelector("#results");
    if (results) {
      setTimeout(() => {
        results.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
    setRequestData((prevState) => ({
      ...prevState,
      isLoading: true,
      numberOfUrls: arr.length,
      data: [],
    }));
    for (let i = 0; i < arr.length; i++) {
      const postPayload = async () => {
        const payload = {
          url: arr[i].trim(),
          metaTitleSuffix,
        };
        await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/meta-data/generate`, payload)
          .then((res) => {
            // console.log(`response for ${arr[i]}`, res.data.data);
            const data = JSON.parse(res.data.data.replace(/(^[ \t]*\n)/gm, ""));
            const metaTitle = data.metaTitle;
            const metaDescription = data.metaDescription;
            setRequestData((prevState) => ({
              ...prevState,
              data: [
                ...prevState.data,
                {
                  id: i,
                  url: arr[i],
                  metaTitle,
                  metaDescription,
                  error: false,
                },
              ],
            }));
          })
          .catch((err) => {
            setRequestData((prevState) => ({
              ...prevState,
              data: [
                ...prevState.data,
                {
                  id: i,
                  url: arr[i],
                  metaTitle: "Error",
                  metaDescription: "Error",
                  error: true,
                },
              ],
            }));
            console.log(err);
          });
      };
      postPayload();
    }
  };

  const regenerate = (url, index) => {
    const requestDataCopy = [...requestData.data];
    const indexOfRegeneratedItem = requestDataCopy.findIndex((x) => x.id === index);
    requestDataCopy[indexOfRegeneratedItem] = {
      id: index,
      url: requestDataCopy[indexOfRegeneratedItem].url,
      metaTitle: requestDataCopy[indexOfRegeneratedItem].metaTitle,
      metaDescription: requestDataCopy[indexOfRegeneratedItem].metaDescription,
      regenerating: true,
      error: false,
    };
    setRequestData((prevState) => ({
      ...prevState,
      data: requestDataCopy,
    }));
    setRegenerationAtWork(true);
    const postPayload = async () => {
      const payload = {
        url,
        metaTitleSuffix: globalTitleSuffix,
      };
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/meta-data/generate`, payload)
        .then((res) => {
          const data = JSON.parse(res.data.data.replace(/(^[ \t]*\n)/gm, ""));
          const metaTitle = data.metaTitle;
          const metaDescription = data.metaDescription;
          requestDataCopy[indexOfRegeneratedItem] = {
            id: index,
            url: requestDataCopy[indexOfRegeneratedItem].url,
            metaTitle,
            metaDescription,
            regenerating: false,
            error: false,
          };
          setRequestData((prevState) => ({
            ...prevState,
            data: requestDataCopy,
          }));
          setRegenerationAtWork(false);
        })
        .catch((err) => {
          requestDataCopy[indexOfRegeneratedItem] = {
            id: index,
            url: requestDataCopy[indexOfRegeneratedItem].url,
            metaTitle: "Error",
            metaDescription: "Error",
            regenerating: false,
            error: true,
          };
          setRequestData((prevState) => ({
            ...prevState,
            data: requestDataCopy,
          }));
          setRegenerationAtWork(false);
          console.log(err);
        });
    };
    postPayload();
  };

  useEffect(() => {
    if (requestData.data.length === requestData.numberOfUrls) {
      setRequestData((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, [requestData.data]);

  return (
    <Dashboard>
      <Section className="THEME__bg-app-light BLOCK__small THEME__border-bottom">
        <Container>
          <div className="text-center">
            <span className="MODULE__pill">BETA</span>
            <h1 className="mb-0">Meta Data Generator</h1>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            schema={Schema__Form__MetaDataGenerator}
            errors={errors}
            isDirty={isDirty}
            isValid={isValid}
            isLoading={requestData.isLoading}
            errorMessage={errorMessage}
          />
        </Container>
      </Section>
      <div id="results">
        {renderResultsView && (
          <Section className={`THEME__border-top BLOCK__default`}>
            <Container>
              <div className="mb-3 THEME__font-size-0n9 text-end">
                <span>
                  {requestData.data.length} of {requestData.numberOfUrls} URLs completed
                </span>
              </div>
              <div className="MODULE__table-wrapper">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">URL</th>
                      <th scope="col">Meta Title</th>
                      <th scope="col">Meta Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestData.data.map((elem) => {
                      const { url, metaTitle, metaDescription, id, error, regenerating } = elem;
                      return (
                        <React.Fragment key={id}>
                          <tr>
                            <td className={`THEME__mw-25p ${error ? `THEME__text-error` : ``}`}>
                              <a href={url} target="_blank" rel="noreferrer">
                                {url}
                              </a>
                            </td>
                            <td className={`THEME__mw-25p ${error ? `THEME__text-error` : ``}`}>
                              {regenerating ? <Skeleton borderRadius height={25} /> : metaTitle}
                            </td>
                            <td className={`THEME__mw-50p ${error ? `THEME__text-error` : ``}`}>
                              {regenerating ? (
                                <>
                                  <Skeleton borderRadius height={20} />
                                  <div style={{ maxWidth: "80%" }}>
                                    <Skeleton borderRadius height={20} />
                                  </div>
                                  <div style={{ maxWidth: "60%" }}>
                                    <Skeleton borderRadius height={20} />
                                  </div>
                                </>
                              ) : (
                                metaDescription
                              )}
                            </td>
                            <td className="align-middle THEME__mw-25p">
                              <Button
                                onClick={() => regenerate(url, id)}
                                isLoading={regenerating}
                                className={`THEME__font-size-0n8 ${
                                  regenerationAtWork || requestData.isLoading ? `pe-none` : ``
                                }`}
                              >
                                {regenerating ? `Loading` : `Regenerate`}
                              </Button>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                    {requestData.isLoading && (
                      <>
                        {[...Array(requestData.numberOfUrls - requestData.data.length)].map(
                          (elem, index) => {
                            return (
                              <tr key={index}>
                                <td className="THEME__mw-25p">
                                  <Skeleton borderRadius height={25} />
                                </td>
                                <td className="THEME__mw-25p">
                                  <Skeleton borderRadius height={25} />
                                </td>
                                <td className="THEME__mw-50p">
                                  <Skeleton borderRadius height={20} />
                                  <div style={{ maxWidth: "80%" }}>
                                    <Skeleton borderRadius height={20} />
                                  </div>
                                  <div style={{ maxWidth: "60%" }}>
                                    <Skeleton borderRadius height={20} />
                                  </div>
                                </td>
                                <td className="THEME__mw-25p align-middle">
                                  <div style={{ minWidth: "130px" }}>
                                    <Skeleton borderRadius height={35} />
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </Container>
          </Section>
        )}
      </div>
    </Dashboard>
  );
};

export default MetaDataGenerator;
