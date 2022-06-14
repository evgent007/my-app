import { useState, useEffect } from 'react'
import { getHackerNews } from '../api'
import Post from './Post'
import Button1 from '../Button/Button1'
import './Post.css'

function Home({ btn, clickbtn }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    getHackerNews('newstories').then(d => setData(d.splice(0, 100)))
  }, [btn])

  useEffect(() => {
    let timer = setInterval(() => {
      getHackerNews('newstories').then(d => setData(d.splice(0, 100)))
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const list =
    data &&
    data.map((d, i) => {
      const even = i % 2 === 0
      let clas = ''
      if (even) {
        clas = ' color2'
      } else {
        clas = ' color1'
      }
      return (
        <li className={'post' + clas} key={d}>
          <Post data={d} />
        </li>
      )
    })

  return (
    <>
      <ol className="cont">
        {/* {data &&
          data.map((d, i) => (
            <li id="collor" className="post color" key={d}>
              <Post data={d} />
            </li>
          ))} */}
        {list}
      </ol>
      <div className="btn1">
        <Button1 n={0.2} />
      </div>
    </>
  )
}

export { Home }
