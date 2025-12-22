// Original file: proto/user.proto


export interface GetUsersRequest {
  'id'?: (string);
  'limit'?: (number);
  'page'?: (number);
  'searchQuery'?: (string);
  '_searchQuery'?: "searchQuery";
}

export interface GetUsersRequest__Output {
  'id': (string);
  'limit': (number);
  'page': (number);
  'searchQuery'?: (string);
  '_searchQuery'?: "searchQuery";
}
