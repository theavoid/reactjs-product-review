import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import toast, { Toaster } from 'react-hot-toast';


function App() {
    const [animationParent] = useAutoAnimate()
    const [reviews, setReviews] = useState([])
    const inputOtherBrand = useRef(null)
    const form = useRef(null)

    const handleSelection = (e) => {
        if (e.target.value === 'diğer') {
            inputOtherBrand.current.style.display = 'block'
        } else {
            inputOtherBrand.current.style.display = 'none'
        }
    }

    useEffect(() => {
        console.log(reviews)
    }, [reviews])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(form.current)
        const data = Object.fromEntries(formData)
        if (data.brand == 'diğer') {
            data.brand = data.otherplatform
        }
        setReviews([data, ...reviews])
        if (reviews.length > 5) {
            toast.error('En fazla 5 değerlendirme gönderebilirsiniz.')
        } else {
            toast.success('Değerlendirmeniz başarıyla eklendi.')
        }

    }

    return (
      <>
          <Toaster />

          <div className="container max-w-xl mx-auto mt-[2em]">

            <h1 className="font-bold text-4xl mb-3">Ürün Değerlendir!</h1>
            <p className="font-medium text-lg">Çeşitli platformlarda satın aldığın ürünleri değerlendir! Markalar hakkında şikayetlerini ilet ve ilgili mercilere ulaştır.</p>
            <div className="divider border border-bottom mt-3 mb-3 rounded-xl"/>

            <div className="application">

                <form ref={form} onSubmit={handleSubmit} action="/api/complaints" method="post">
                    <div className="form-group mb-3">
                        <label className="font-medium text-lg">Ürün Adı <span className="text-red-500">*</span></label>
                        <input name="name" type="text" className="w-full p-2 border rounded mt-2 text-md outline-0 focus:border-stone-700" placeholder="Değerlendireceğiniz ürünün adı/kimliği."/>
                    </div>

                    <div className="form-group mb-3" >
                        <label className="font-medium text-lg">Değerlendirmeniz <span className="text-red-500">*</span></label>
                        <textarea name="content" className="w-full p-2 border rounded mt-2 text-md outline-0 focus:border-stone-700" placeholder="Ürün hakkında değerlendirmeniz."></textarea>
                    </div>

                    <div className="form-group mb-3">
                        <label className="font-medium text-lg">Ürününüzü hangi platformda satın aldınız? <span className="text-red-500">*</span></label>
                        <select name="brand" onClick={handleSelection} className="w-full p-2 border rounded mt-2 text-md outline-0 focus:border-stone-700">
                            <option value="amazon">Amazon</option>
                            <option value="gittigidiyor">GittiGidiyor</option>
                            <option value="hepsiburada">Hepsiburada</option>
                            <option value="n11">N11</option>
                            <option value="trendyol">Trendyol</option>
                            <option value="vatanbilgisayar">Vatan Bilgisayar</option>
                            <option value="yemeksepeti">Yemeksepeti</option>
                            <option value="diğer">Diğer</option>
                        </select>
                    </div>

                    <div className="form-group mb-3" ref={inputOtherBrand} style={{ display: "none" }}>
                        <label className="font-medium text-lg">Diğer platform <span className="text-red-500">*</span></label>
                        <input name="otherplatform" type="text" className="w-full p-2 border rounded mt-2 text-md outline-0 focus:border-stone-700" placeholder="Ürünü hangi platformdan satın aldınız?"/>
                    </div>

                    <button className="w-full bg-indigo-500 text-white p-2 rounded text-md font-semibold">Yayınla</button>
                </form>

            </div>

            <div className="divider border border-bottom mt-3 mb-3 rounded-xl"/>

            <div className="reviews" ref={animationParent}>
                {reviews
                    .slice(0, 5)
                    .map((review, index) => (
                    <div className="review bg-blue-100 p-4 mb-3 rounded" key={index}>
                        <div className="review-header">
                            <div className="review-brand flex">
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="React Logo" className="w-8 h-8 mr-2"/>
                                <span className="font-medium text-lg flex-1">{review.brand} <img className="inline-flex" width="18" height="18" src="https://cdn-icons-png.flaticon.com/512/7641/7641727.png" alt=""/></span>
                            </div>
                        </div>
                        <div className="divider border border-blue-200 border-bottom mt-3 mb-3 rounded-xl"/>
                        <div className="review-title">
                            <span className="font-medium text-lg font-semibold">{review.name}</span>
                        </div>
                        <div className="review-content bg-blue-200 p-2 mt-2 rounded">
                            <p className="font-medium text-md">{review.content}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
      </>
    )
}

export default App
