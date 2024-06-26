'use client';

import {
  type Dispatch,
  createContext,
  useReducer,
  useContext,
  useEffect,
} from 'react';
import type { OrderBy } from '@/types/tcg';
import type { QToTCGTableKeys } from '@/lib/tcg';
import { useSearchParams } from 'next/navigation';

const defaults: InitialState = {
  exclude: false,
  orderBy: [],
  hp: [10, 400],
  series: [],
  pokedex: [],
  traits: [],
  abilities: [],
  marks: [],
  cards: [],
  artists: [],
  rarities: [],
  supertypes: [],
  subtypes: [],
  attacks: [],
  sets: [],
  types: [],
  legalities: [],
};

// const initial: InitialState = structuredClone(defaults);

// Create a context for providing the form state to components.
const FormContext = createContext<InitialState>(null as any);

// Create a context for providing the dispatch function for form actions to components.
const DispatchContext = createContext<Dispatch<FormAction>>(null as any);
// Create a custom hook to access the form state from the context.
const useFormContext = () => useContext(FormContext);
const useDispatchContext = () => useContext(DispatchContext);

// Define the reducer function to handle form actions and update the state accordingly.
const reducer = (state: InitialState, action: FormAction): InitialState => {
  // If the action has a key and the corresponding state value is undefined, throw an error.
  if (action.key && state[action.key] === undefined) {
    throw Error(`Invalid key: ${action.key}`);
  }

  switch (action.type) {
    default:
      throw Error('Unknown action: ' + (action as any).type);
    case 'reset':
      if (!action.key) return { ...defaults };
      return { ...state, [action.key]: defaults[action.key] };
    case 'set':
      return { ...state, [action.key]: action.value };
    case 'delete':
      return {
        ...state,
        [action.key]: state[action.key].filter((v) => v.id !== action.id),
      };
  }
};

const FormProvider = (props: React.PropsWithChildren) => {
  const [fields, dispatch] = useReducer(reducer, defaults);
  const searchParams = useSearchParams();

  useEffect(() => {}, [searchParams]);

  return (
    <FormContext.Provider value={fields}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </FormContext.Provider>
  );
};

type FormKeys = keyof InitialState;

type SetAction = {
  type: 'set';
  key: FormKeys;
  value: FieldValues | any;
};

type DeleteAction = {
  type: 'delete';
  key: ExcludedFormKeys;
  id: string;
};

type ResetAction = {
  type: 'reset';
  key: FormKeys | null;
};

type FormAction = SetAction | DeleteAction | ResetAction;

type FieldValues<T = string> = Array<{
  id: string;
  name: T;
  exclude?: boolean;
}>;

type ExcludedFormKeys = Exclude<
  FormKeys,
  'hp' | 'page' | 'pageSize' | 'exclude'
>;

type InitialState = {
  hp: number[];
  orderBy: FieldValues<OrderBy>;
  exclude: boolean;
} & Record<Exclude<QToTCGTableKeys, 'hp'>, FieldValues>;

export {
  type ExcludedFormKeys,
  type InitialState,
  type FieldValues,
  type FormKeys,
  FormProvider,
  useFormContext,
  useDispatchContext,
};
