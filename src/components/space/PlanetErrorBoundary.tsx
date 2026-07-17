import { Component, type ReactNode } from "react";
import { PlanetFallback } from "./PlanetFallback";

type Props = {
  children: ReactNode;
  color?: string;
  scale?: number;
};

type State = {
  hasError: boolean;
};

export class PlanetErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Planet failed to load:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <PlanetFallback
          color={this.props.color}
          scale={this.props.scale}
        />
      );
    }
    return this.props.children;
  }
}
