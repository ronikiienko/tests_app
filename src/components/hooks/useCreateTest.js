import React, {useReducer} from 'react';


const initialTestConfigs = {};

const reducer = (state, action) => {

};
export const useCreateTest = () => {
    const [testConfigs, dispatch] = useReducer(reducer, initialTestConfigs);
    const updateQuestionProperty = React.useCallback(() => dispatch(), []);
    return [testConfigs, updateQuestionProperty];
};