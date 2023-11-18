// Import necessary modules and components
import { QToTCGTableKeys } from '@/lib/tcg';
import { cn } from '@/lib/utils';
import { TCardFull } from '@/types/tcg';
import Image from '@/ui/image';
import { Link } from '@/ui/link';

// Define generic Props type for the components
type Props<T> = React.PropsWithChildren<{
  id: string;
  data: T;
  className?: string;
  q: QToTCGTableKeys;
}>;

// Define generic function type for the components
type Comp<T> = (x: Props<T>) => JSX.Element;

// TypesImage component definition
const TypesImage: Comp<TCardFull['types']> = (props) => {
  // If data is empty, render '--'
  if (!props.data?.length) {
    return <>--</>;
  }

  // Render images for each type in the data
  return (
    <>
      {props.data.map((type, i) => (
        <SearchLink key={type} q={props.q} value={type}>
          <Image
            key={`${props.id}-${type}.${i}`}
            src={`/types/${type.toLowerCase()}.png`}
            height={24}
            width={24}
            className={cn('object-contain', props.className)}
            alt={`${type} icon`}
          />
          {props.children}
        </SearchLink>
      ))}
    </>
  );
};

// SearchLink component definition
type SearcLinkProps = React.PropsWithChildren<{ q: string; value: any }>;
const SearchLink = ({ children, q, value }: SearcLinkProps) => {
  // Create a link with a URL based on the provided query and value
  return (
    <Link focus="none" variant="underline" href={`/search?${q}=${value}`}>
      {children}
    </Link>
  );
};

// Optional component definition
const Optional = (
  props: Pick<Parameters<Comp<any>>[0], 'data' | 'children'>,
) => {
  // If data is empty, render '--'; otherwise, render the children
  if (!props.data?.length) return <>--</>;
  return <>{props.children}</>;
};

// Export the components
export { TypesImage, SearchLink, Optional };
