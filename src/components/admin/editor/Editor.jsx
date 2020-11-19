import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize';
import Axios from 'axios';

const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;
//register image resizer
Quill.register('modules/imageResize', ImageResize);

const QuillClipboard = Quill.import('modules/clipboard');


class Clipboard extends QuillClipboard {

    getMetaTagElements = (stringContent) => {
        const el = document.createElement('div');
        el.innerHTML = stringContent;
        return el.getElementsByTagName('meta');
    };

    async onPaste(e) {
        let clipboardData = e.clipboardData || window.clipboardData;
        let pastedData = await clipboardData.getData('Text');

        const urlMatches = pastedData.match(/\b(http|https)?:\/\/\S+/gi) || [];
        if (urlMatches.length > 0) {
            e.preventDefault();
            urlMatches.forEach(link => {
                Axios.get(link)
                    .then(payload => {
                        // let title, image, url, description;
                        let title, image, url;
                        for (let node of this.getMetaTagElements(payload)) {
                            if (node.getAttribute("property") === "og:title") {
                                title = node.getAttribute("content");
                            }
                            if (node.getAttribute("property") === "og:image") {
                                image = node.getAttribute("content");
                            }
                            if (node.getAttribute("property") === "og:url") {
                                url = node.getAttribute("content");
                            }
                            // if (node.getAttribute("property") === "og:description") {
                            //     description = node.getAttribute("content");
                            // }
                        }

                        const rendered = `<a href=${url} target="_blank"><div><img src=${image} alt=${title} width="80%"/><span>${title}</span></div></a>`;

                        let range = this.quill.getSelection();
                        let position = range ? range.index : 0;
                        this.quill.pasteHTML(position, rendered, 'silent');
                        this.quill.setSelection(position + rendered.length);
                    })
                    .catch(error => console.error(error));
            });

        } else {
            //console.log('when to use this') 
            super.onPaste(e);
        }
    }

}
Quill.register('modules/clipboard', Clipboard, true);

const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {

    static create(value) {
        const imgTag = super.create();
        imgTag.setAttribute('src', value.src);
        imgTag.setAttribute('alt', value.alt);
        imgTag.setAttribute('width', '80%');
        return imgTag;
    }

    static value(node) {
        return { src: node.getAttribute('src'), alt: node.getAttribute('alt') };
    }

}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);

class VideoBlot extends BlockEmbed {

    static create(value) {
        if (value && value.src) {
            const videoTag = super.create();
            videoTag.setAttribute('src', value.src);
            videoTag.setAttribute('title', value.title);
            videoTag.setAttribute('width', '80%');
            videoTag.setAttribute('controls', '');

            return videoTag;
        } else {
            const iframeTag = document.createElement('iframe');
            iframeTag.setAttribute('src', value);
            iframeTag.setAttribute('frameborder', '0');
            iframeTag.setAttribute('allowfullscreen', true);
            iframeTag.setAttribute('width', '80%');
            return iframeTag;
        }
    }

    static value(node) {
        if (node.getAttribute('title')) {
            return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
        } else {
            return node.getAttribute('src');
        }
        // return { src: node.getAttribute('src'), alt: node.getAttribute('title') };
    }

}

VideoBlot.blotName = 'video';
VideoBlot.tagName = 'video';
Quill.register(VideoBlot);

class FileBlot extends BlockEmbed {

    static create(value) {
        const prefixTag = document.createElement('span');
        prefixTag.innerText = "첨부파일 - ";

        const bTag = document.createElement('b');
       
        bTag.innerText = value;

        const linkTag = document.createElement('a');
        linkTag.setAttribute('href', value);
        linkTag.setAttribute("target", "_blank");
        linkTag.setAttribute("className", "file-link-inner-post");
        linkTag.appendChild(bTag);
        //linkTag  <a href="btn_editPic@3x.png" target="_blank" classname="file-link-inner-post"><b>btn_editPic@3x.png</b></a>

        const node = super.create();
        node.appendChild(prefixTag);
        node.appendChild(linkTag);

        return node;
    }

    static value(node) {
        const linkTag = node.querySelector('a');
        return linkTag.getAttribute('href');
    }

}

FileBlot.blotName = 'file';
FileBlot.tagName = 'p';
FileBlot.className = 'file-inner-post';
Quill.register(FileBlot);

class PollBlot extends BlockEmbed {

    static create(value) {
        const prefixTag = document.createElement('span');
        prefixTag.innerText = "투표 - ";

        const bTag = document.createElement('b');
        bTag.innerText = value.title;

        const node = super.create();
        node.setAttribute('id', value.id);
        node.appendChild(prefixTag);
        node.appendChild(bTag);

        return node;
    }

    static value(node) {
        const id = node.getAttribute('id');
        const bTag = node.querySelector('b');
        const title = bTag.innerText;
        return { id, title };
    }

}

PollBlot.blotName = 'poll';
PollBlot.tagName = 'p';
PollBlot.className = 'poll-inner-post';
Quill.register(PollBlot);

class QuillEditor extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            editorHtml: "",
            upload: []
        }

        this.reactQuillRef = null;
        this.inputOpenImageRef = React.createRef();
        this.inputOpenVideoRef = React.createRef();
        this.inputOpenFileRef = React.createRef();
    }
        
    

   
   componentDidMount() {
       this._isMounted = true
   }
   
  componentWillUnmount() {
      this._isMounted = false;
  }

    // insertImage: this.imageHandler
    imageHandler = () => {
        this.inputOpenImageRef.current.click();
    };

    videoHandler = () => {
        this.inputOpenVideoRef.current.click();
    };

    fileHandler = () => {
        this.inputOpenFileRef.current.click();
    };


    insertImage = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            let formData = new FormData();
            const config = {
                method: 'post',
                header: { 'content-type': 'multipart/form-data' }
            }
            formData.append("file", file);

            Axios.post('/api/auth/posts/files', formData, config)
                .then(response => {
                    if (response.status === 200) {
                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();

                        let range = quill.getSelection();
                        let position = range ? range.index : 0;

                        quill.insertEmbed(position, "image", { src: response.data.url, alt: response.data.name });
                        quill.setSelection(position + 1);

                        if (this._isMounted) {
                            this.setState({
                                upload: [...this.state.upload,response.data.url]
                            }, () => { this.props.onFilesChange(this.state.upload) });
                        }
                    }
                     else {
                        return alert('failed to upload file')
                    }
                });
        }
    };

    insertVideo = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];

            let formData = new FormData();
            const config = {
                method: 'post',
                header: { 'content-type': 'multipart/form-data' }
            }
            formData.append("file", file);

            Axios.post('/api/auth/posts/files', formData, config)
                .then(response => {
                    if (response.status === 200) {
                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();

                        let range = quill.getSelection();
                        let position = range ? range.index : 0;
                        quill.insertEmbed(position, "video", { src: response.data.url, title: response.data.name });
                        quill.setSelection(position + 1);

                        if (this._isMounted) {
                            this.setState({
                                upload: [...this.state.upload, response.data.url]
                            }, () => { this.props.onFilesChange(this.state.upload) });
                        }
                    } else {
                        return alert('failed to upload file')
                    }
                })
        }
    }

    insertFile = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            let formData = new FormData();
            const config = {
                method: 'post',
                header: { 'content-type': 'multipart/form-data' }
            }
            formData.append("file", file);

            Axios.post('/api/auth/posts/files', formData, config)
                .then(response => {
                    if (response.status === 200) {

                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();

                        let range = quill.getSelection();
                        let position = range ? range.index : 0;
                        quill.insertEmbed(position, "file", response.data.name);
                        quill.setSelection(position + 1);

                        if (this._isMounted) {
                            this.setState({
                                upload: [...this.state.upload, response.data.name]
                            }, () => { this.props.onFilesChange(this.state.upload) });
                        }
                    };
                })
        }
    };

    render() {
        return (
            <div>
                <div id="toolbar">
                    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                        <option value="1" />
                        <option value="2" />
                        <option value="3" />
                        <option value="4" />
                        <option value="5" />
                        <option value="6" />
                        <option value="" />
                    </select>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <select className="ql-color">
                    </select>
                    <select className="ql-background">
                    </select>
                    <select className="ql-align">
                    </select>
                    <button className="ql-list" value="ordered"/>
                    <button className="ql-list" value="bullet"/>
                    <button className="ql-strike" />
                    <button className="ql-script" value="sub" />
                    <button className="ql-script" value="super" />
                    <button className="ql-insertImage">
                        <i className="fa fa-image"></i>
                    </button>
                    <button className="ql-insertVideo">
                    <i className="fa fa-video"></i>
                    </button>
                    <button className="ql-insertFile">
                    <i className="fa fa-file"></i>
                    </button>
                    <button className="ql-link" />
                    <button className="ql-code-block" />
                    <button className="ql-video" />
                    <button className="ql-blockquote" />
                    <button className="ql-clean" />

                    

                </div>
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'snow'}
                   
                    onChange={(html) => {
                        this.setState({
                          editorHtml: html
                       }, () => {
                        this.props.onEditorChange(this.state.editorHtml);
                     });
                    }}
                    modules={this.modules}
                    formats={this.formats}
                  value={this.state.editorHtml}
                    placeholder={this.props.placeholder}
                />
                <input type="file" accept="image/*" ref={this.inputOpenImageRef} style={{ display: "none" }} onChange={this.insertImage} />
                <input type="file" accept="video/*" ref={this.inputOpenVideoRef} style={{ display: "none" }} onChange={this.insertVideo} />
                <input type="file" accept="*" ref={this.inputOpenFileRef} style={{ display: "none" }} onChange={this.insertFile} />
            </div>
        )
    }

    modules = {
        syntax: false,
        toolbar: {
            container: "#toolbar",
            //id ="toorbar"
            handlers: {
                insertImage: this.imageHandler,
                insertVideo: this.videoHandler,
                insertFile: this.fileHandler,
                insertPoll: this.pollHandler,
            }
        },
        imageResize: {
            displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
        },

    };

    formats = [
        'header', 'align', 'list',
        'bold', 'italic', 'underline','color', 'background', 'strike','script',
        'image', 'video', 'file', 'link',"code-block", "video", "blockquote", "clean"
    ];
}

export default QuillEditor;
