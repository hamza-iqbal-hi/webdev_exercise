import React, { useCallback } from "react";
import { getAPIEndpoint } from "../../utils/helpers";
import Button from '../Button/Button'
const addUsersBulk = async () => {
  await fetch(`${getAPIEndpoint()}/users`, {
    method: "POST",
  });
};


type Props = {
  refetch: () => void;
};
const AddUsers: React.FC<Props> = ({ refetch }) => {
  const onClick = useCallback(() => {
    addUsersBulk().then(refetch);
  }, [refetch]);
  return <Button variant="default" onClick={onClick}>Add Users</Button>;
}
export default AddUsers