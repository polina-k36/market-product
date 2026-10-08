import { useMutation } from '@tanstack/react-query';

import { addressApi } from '../api/address.api';
import type { ICreateUpdateAddress } from '../types/address.types';
import { ADDRESSES_QUERY_KEY } from './use-addresses';

export function useCreateUpdateAddress(id?: number) {
  return useMutation({
    mutationKey: [...ADDRESSES_QUERY_KEY, id ? 'update' : 'create', id],

    mutationFn: (data: ICreateUpdateAddress) => {
      if (id) {
        return addressApi.updateAddressById(id, data);
      }

      return addressApi.createAddress(data);
    },
  });
}
