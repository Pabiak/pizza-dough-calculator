const useExampleHook = () => {
  const exampleFunction = () => {
    console.log("This is an example function");
  };

  return {
    exampleFunction,
  };
};
export default useExampleHook;
