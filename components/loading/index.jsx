import React from 'react'
import Lottie from "lottie-react";

// Lottie
import animationData from "../../public/animations/loading_animation.json";

const Loading = () => {
  return (
    <Lottie className="animation" animationData={animationData} />
  )
}

export default Loading