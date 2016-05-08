
export default {
  CLIENT: typeof window !== 'undefined',
  SERVER: typeof window === 'undefined',
};
