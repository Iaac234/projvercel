export default async function handler(req, res) {
  if (req.query.key !== '--ujbsnTgbA5tBmUY' || !req.query.path) {
    return res.status(400).json({
      error: {
        message: 'Expected a proper args to validate the request, Never Found',
        code: 400
      }
    })
  }

  try {
    await res.revalidate(req.query.path)
    return res.status(200).json({ revalidated: true })
  } catch (err) {
    return res.status(500).json({
      error: {
        message: 'Internal server error. Likely due to invalid path.',
        cause: err.message,
        code: 500
      }
    })
  }
}