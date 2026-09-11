import { Component, Suspense } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { lazyProvider } from './mf';

const RemoteProductList = lazyProvider('shop', 'ProductList');

class RemoteErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Shop remote failed to load:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-box">
          <h2>Shop Remote unavailable</h2>
          <p>Start the Shop application on port 4174 and refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <main className="shell-app">
      <header>
        <h1>Shell Host</h1>
        <p>
          The Product List below is loaded from the Shop Remote at runtime
          through Module Federation.
        </p>
      </header>

      <RemoteErrorBoundary>
        <Suspense fallback={<p>Loading Shop Remote...</p>}>
          <RemoteProductList />
        </Suspense>
      </RemoteErrorBoundary>
    </main>
  );
}
