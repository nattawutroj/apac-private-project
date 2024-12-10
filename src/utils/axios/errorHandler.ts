// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (error: any) => {
  const res: {
    data: { messages?: string }
    status: number
  } = {
    data: error?.response?.data,
    status: error.response.status,
  }
  return res
}
