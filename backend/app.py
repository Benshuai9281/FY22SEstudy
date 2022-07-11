from mangum import Mangum
from router import app

handler = Mangum(app)
