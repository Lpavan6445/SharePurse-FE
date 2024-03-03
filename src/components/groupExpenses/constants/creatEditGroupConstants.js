export const GROUP_NAME = "group_name";
export const GROUP_IMAGE = "group_image";

export const CREATE_GROUP = {
  [GROUP_NAME]: {
    name: GROUP_NAME,
    labelText: "Group name",
    placeholder: "Enter group name",
    autocomplete: "group_name",
    validations: {
      required: {
        message: "Required",
        value: true,
      },
    },
  },
  [GROUP_IMAGE]: {
    name: GROUP_IMAGE,
    labelText: "* Image",
    placeholder: "Select a Image",
    autocomplete: "group_image",
  },
};
