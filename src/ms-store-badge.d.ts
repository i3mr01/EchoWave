// TypeScript declarations for Microsoft Store Badge web component
declare namespace JSX {
  interface IntrinsicElements {
    'ms-store-badge': {
      productid?: string;
      productname?: string;
      'window-mode'?: 'direct' | 'popup' | 'full';
      theme?: 'auto' | 'light' | 'dark';
      size?: 'small' | 'medium' | 'large';
      language?: string;
      animation?: 'on' | 'off';
      children?: React.ReactNode;
    };
  }
}

