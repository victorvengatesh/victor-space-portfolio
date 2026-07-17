import {
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";

type SpaceErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type SpaceErrorBoundaryState = {
  hasError: boolean;
};

export class SpaceErrorBoundary extends Component<
  SpaceErrorBoundaryProps,
  SpaceErrorBoundaryState
> {
  state: SpaceErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): SpaceErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(
    error: Error,
    errorInfo: ErrorInfo,
  ) {
    console.error(
      "3D space scene failed:",
      error,
      errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
