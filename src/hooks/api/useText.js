import useAsync from '../useAsync';
import useToken from '../useToken';

import * as textApi from '../../services/textApi'

export default function useText(text) {
  //const token = useToken();
  
  const {
    data: text,
    loading: textLoading,
    error: textError,
    act: storeText
  } = useAsync(() => textApi.storeText(text));

  return {
    text,
    textLoading,
    textError,
    storeText
  };
}