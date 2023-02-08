import React, { useCallback } from "react";
import { getAPIEndpoint } from "../../utils/helpers";
import Button from '../Button/Button'

const deleteUsersBulk = async () => {
  await fetch(`${getAPIEndpoint()}/users`, {
    method: "DELETE",
  });
};
type Props = {
  refetch: () => void;
};
const RemoveUsers: React.FC<Props> = ({ refetch }) => {
  const onClick = useCallback(() => {
    deleteUsersBulk().then(refetch);
  }, [refetch]);

  return <Button variant="default" onClick={onClick}>Remove Users</Button>;
}
export default RemoveUsers