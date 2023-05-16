import { useContext } from 'react';
import { CurrentActContext, CurrentProjectContext } from '@/contexts/Contexts';

const switchNavButton = (document) => document.title;

export default function NavigationButton({ document }) {
  return (
    <div>
      <button type="button">
        {' '}
        {switchNavButton(document)}
      </button>
    </div>
  )
}
