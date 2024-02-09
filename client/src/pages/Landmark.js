import {DocumentRenderer} from '@keystone-6/document-renderer'
import {useQuery, gql} from '@apollo/client'
import {Link, useParams} from 'react-router-dom'
import {FaMapPin} from 'react-icons/fa'

import Page from '../components/Page'

function Landmark() {
  const {id} = useParams()

  const query = gql`
    query Landmarks($where: LandmarkWhereInput!) {
      landmarks(where: $where, take: 1) {
        content
        coords
        image {
          url
        }
        name
      }
    }
  `

  const {loading, error, data} = useQuery(query, {
    variables: {where: {urlId: {equals: id}}}
  })

  if (loading || error || !data) {
    return null
  }

  const landmark = data?.landmarks[0]
  const {content, coords, image, name} = landmark

  return (
    <Page name={name}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 prose">
          <div className="mb-4">
            <Link className="text-blue-600 font-bold no-underline hover:underline" to={`/map`}>
              &lsaquo; Back to Map
            </Link>
          </div>
          <div className="font-bold">
            <FaMapPin className="inline" />
            &nbsp;Coordinates: ${coords}
          </div>
          <div>${content}</div>
        </div>
        <div className="flex-1">
          <img src={image.url} alt={name} />
        </div>
      </div>
    </Page>
  )
}

export default Landmark
