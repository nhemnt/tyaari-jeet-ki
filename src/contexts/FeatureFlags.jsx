import React from "react";
import featuresJSON from '../features.json';

export const FeatureFlags = React.createContext({});

function later(payload, delay =500) {
  return new Promise(function(resolve) {
      setTimeout(() => resolve(payload), delay);
  });
}

export const FeatureFlagsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [features, setFeatures] = React.useState({});

  const updateFeature = async () => {
    try {
      const data = await later(featuresJSON);

      setFeatures(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }

  }
  const toggleFeature = (featureName, val) => {
    setFeatures(prev => ({...prev, [featureName]: val}));
  }

  React.useEffect(() => {
    updateFeature();
  }, []);

  

  return (
    <FeatureFlags.Provider value={{ features, toggleFeature }}>
      {isLoading ? "Loading..." : children}
    </FeatureFlags.Provider>
  );
}