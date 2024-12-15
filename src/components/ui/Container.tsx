interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean; // Prop para ancho completo
  fullHeight?: boolean; // Prop para alto completo
}

const Container = ({ children, className = '', fullWidth = false, fullHeight = false }: ContainerProps) => {
  return (
    <div
      className={`
        ${fullWidth ? 'w-full' : 'max-w-7xl mx-auto'}
        ${fullHeight ? 'h-full min-h-screen flex items-center' : ''}
        px-4 sm:px-6 lg:px-8 ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;




  