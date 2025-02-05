import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Dashboard = () => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  function handleToggleSidebar() {
    setIsSidebarToggled((prev) => !prev);
  }

  return (
    <div className="h-screen overflow-hidden">
      <Navbar onToggleSidbar={handleToggleSidebar} />
      <div className="flex h-screen">
        <Sidebar isToggled={isSidebarToggled} />
        <main className="overflow-scroll flex-1 p-4 bg-[#1e1f21]">
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit eos
            consectetur magnam molestiae veniam dignissimos ipsam alias debitis
            dolorum fuga neque laboriosam, officiis quae ipsa, quia optio quod
            recusandae architecto! Sit nam porro accusamus quisquam veniam?
            Illum aspernatur beatae impedit accusamus provident rerum similique
            minima amet, nulla blanditiis, sint dicta error consequuntur eveniet
            reprehenderit qui inventore corrupti in a quae. Aliquid itaque
            sequi, eos magni libero est velit nesciunt modi aliquam laboriosam
            placeat quo saepe distinctio eveniet ducimus harum exercitationem
            reiciendis sit et qui dicta numquam illo maiores accusantium! Porro.
            Quo nulla corporis magnam consequuntur, aperiam dolores quos
            recusandae quibusdam maxime fuga quidem saepe incidunt nemo iste ex.
            Quibusdam laudantium dolor, laborum voluptas inventore sit officiis
            veritatis non magni quia. Cum temporibus ipsa eligendi. Sed ex
            similique, illo ut eius sunt velit alias dolorem voluptas
            accusantium laudantium fugit neque voluptatibus modi, esse assumenda
            sequi ipsam dicta a, expedita repellendus earum. Fugit ratione eos
            facere quae expedita aperiam dicta debitis ad explicabo. Magnam,
            debitis atque? Veniam quaerat reiciendis voluptates minima
            perferendis est aut fugiat laborum iure, hic aliquid officiis dicta
            sequi! Commodi tempora labore blanditiis maiores alias ad, vitae
            dicta vel exercitationem temporibus perspiciatis dolorum dignissimos
            eaque dolorem optio, necessitatibus voluptas quam nostrum corporis
            repellendus pariatur velit! Obcaecati est assumenda neque! Officiis
            a voluptas maiores ipsa, deleniti esse pariatur. Necessitatibus
            temporibus quae reiciendis ea! Ipsum facere delectus molestias
            harum, unde dignissimos doloribus illum reiciendis ipsam nulla quo
            aspernatur temporibus deleniti enim. Quos officiis deserunt dolor a
            maxime ex excepturi culpa at facere. Nisi qui ratione illo,
            assumenda cumque odio repudiandae molestias quaerat aliquid ab,
            omnis facere? Voluptatem fuga quas aliquam architecto. Veniam,
            aliquid! Voluptatem, sit! Repellat, nostrum magnam cupiditate earum
            quasi illo impedit nam rem porro quas a ipsam culpa voluptatum
            dignissimos provident nobis neque? Dignissimos vero ipsum neque
            perspiciatis repellendus. Corrupti rerum iure eos repudiandae
            blanditiis porro quis perferendis accusantium quod! Quia id corporis
            consectetur, rem fugit, perferendis soluta eveniet modi, odit
            molestiae optio debitis iste! Atque incidunt hic dolorum. Nihil
            aliquid eaque rem impedit quisquam vero praesentium ullam
            perspiciatis, quam culpa dolorem velit officia quis, qui obcaecati
            aperiam. Omnis autem at, neque quam illum saepe accusamus unde sunt
            blanditiis. Sed laudantium quae libero aliquid commodi est deleniti
            hic earum, officia illum voluptatibus fugit at unde consectetur
            possimus inventore facere in dignissimos voluptates eaque, quasi
            esse a? Nisi, doloribus incidunt! Cupiditate debitis deserunt
            perspiciatis inventore quaerat, voluptatem ad repudiandae, illo ex
            sequi aliquam atque, unde veritatis provident. Qui quidem libero,
            vel at et nulla voluptatibus fugit hic, culpa dolorem quae?
            Repudiandae, itaque tempore nam nulla doloribus molestiae a alias,
            odit in, beatae maiores laudantium molestias error quidem ipsum fuga
            ea. Voluptates corporis ullam ipsum quidem velit, quo officia autem
            odio! Hic quia aliquam sapiente, et nesciunt maxime natus non
            maiores quam ducimus, dolore incidunt ab cumque accusantium sunt
            sequi quaerat vero deleniti? Delectus reiciendis placeat rerum
            sapiente tempore, porro laudantium? Velit labore eum nisi eligendi
            dolorem. Alias recusandae, enim qui molestias dolores quos ad dolor
            excepturi quia laudantium? Veritatis nesciunt non soluta! Officiis
            odio assumenda nesciunt facere dolore, asperiores illo? Obcaecati
            quidem voluptatum enim adipisci consequatur vitae non doloremque
            nisi, debitis natus assumenda magnam. Esse ea consectetur distinctio
            impedit! Debitis libero blanditiis ab quas est odit, molestiae quos
            id nisi. Ab nostrum commodi possimus ut cum eveniet aliquid facilis
            amet odit numquam totam quasi, placeat, consequuntur quis voluptate,
            officia doloribus iusto fugiat ipsum ipsa accusamus mollitia
            voluptates! Quis, repellat dignissimos. Sit nesciunt provident
            suscipit voluptatibus, quo accusamus, nam sequi commodi vel esse
            maxime reprehenderit quaerat deserunt laudantium doloremque? Natus
            accusamus non fugit corporis excepturi recusandae culpa provident
            voluptatum eum hic. Eligendi tenetur ab facilis non. Impedit
            consequuntur soluta ex, cupiditate nobis quis earum dolores,
            corporis omnis tempore vitae velit assumenda eligendi deserunt
            beatae ducimus rerum eius ullam? Alias, perferendis fuga. Quidem
            beatae similique non id quia obcaecati, quibusdam, in explicabo
            harum minima, esse reprehenderit blanditiis ullam laudantium hic
            facere laboriosam soluta. Placeat voluptates earum ea reiciendis,
            repellendus rerum. Deserunt, consequatur. Culpa delectus minus enim
            rerum fuga corporis maiores veritatis, quidem impedit unde officiis
            quod fugiat omnis tempora quaerat! Totam alias porro ad quo officia
            aut maiores cumque obcaecati vel minima. Ex, quaerat magnam
            explicabo, voluptatum eius laudantium rerum voluptates tenetur, illo
            voluptate animi eos fuga? Repellendus modi assumenda dignissimos
            dolorum rerum blanditiis ad corporis, autem quidem ut, accusantium
            maiores nihil. Sequi nesciunt odit sit impedit dolores, expedita
            mollitia natus recusandae molestiae et atque doloribus! Minima,
            architecto, mollitia nesciunt eligendi veniam, dolor cum est rem non
            aperiam commodi? Accusamus, assumenda provident. Animi itaque autem
            sed, tenetur perferendis incidunt quae aliquid asperiores vitae
            earum magnam voluptates excepturi magni hic maiores, optio tempore
            id vero, dolorem nemo temporibus iure! Laborum aliquam quis
            nesciunt. Labore nemo nostrum exercitationem quas veritatis
            explicabo animi est amet necessitatibus magni accusamus atque quasi
            totam molestiae corporis maxime aut, ratione id ullam fuga eos
            veniam similique. Sed, totam labore! Aperiam ex neque, debitis est,
            natus assumenda rerum modi totam veniam, quo officiis error quod.
            Quasi culpa praesentium iste tenetur sed, sapiente ullam vero
            voluptates, nesciunt dolores mollitia ipsa facere. Non deserunt,
            quas et unde fuga eius exercitationem optio mollitia, sunt ex vitae
            incidunt temporibus facere aliquam sint doloribus ullam. Sapiente
            eligendi consequatur iure esse eos? Sequi necessitatibus ducimus at.
            Et neque exercitationem ab cupiditate explicabo obcaecati quis
            voluptas quo praesentium eius repellendus distinctio dolores ex,
            facere ullam illo non corporis reiciendis quas quia impedit alias?
            Ea aperiam accusantium commodi! Cupiditate enim eligendi, nisi iure
            consectetur molestias. Numquam, perferendis voluptates rem corporis
            ipsum possimus suscipit fugit sint? Totam voluptas illum adipisci
            laborum sapiente! Dicta quas perferendis odio natus voluptate atque?
            Placeat dolore iure quam non sint natus, nisi temporibus hic quas
            rem molestias et veniam corporis, consequuntur est rerum illum.
            Neque fugiat dolores voluptate veritatis quas in ad recusandae
            doloribus. Ipsam ab ratione quos iste consequuntur ea amet illum
            quis? Corporis suscipit veritatis necessitatibus nihil, quaerat
            animi tempora impedit, rem, exercitationem ipsa explicabo. Qui,
            impedit? Quam blanditiis explicabo sunt dicta? Eveniet, omnis. Modi
            est accusantium totam, blanditiis dolorum repudiandae autem magnam
            tenetur magni doloribus reiciendis, veritatis eveniet corrupti id.
            Sequi quibusdam odit assumenda quaerat perferendis unde fuga optio
            corporis sit? Aliquid reprehenderit repellat deserunt tempore
            possimus porro odit nostrum? Consequuntur vero error molestias
            incidunt voluptatibus suscipit fugit maiores et eligendi aliquid
            placeat tenetur, nulla quisquam necessitatibus optio quae provident
            tempora. Odio soluta cumque vero, molestiae architecto quas et quis
            nisi eum modi beatae, temporibus suscipit neque eius debitis esse,
            iure magni! Alias, provident quaerat aliquid maiores voluptates
            fugiat architecto neque? A optio at voluptates. Blanditiis quos
            saepe natus exercitationem, deleniti quis commodi alias molestias
            quidem amet velit eveniet est expedita doloribus? Alias perferendis
            voluptas optio ut impedit ad provident at? Nulla quas itaque illum
            nemo explicabo expedita aperiam eos doloremque laboriosam, non esse
            eius exercitationem aspernatur dicta minima obcaecati ipsa, ab
            ducimus minus dignissimos reprehenderit repellendus voluptatem?
            Sequi, quis animi. Quasi distinctio illo possimus tenetur inventore
            quae quaerat obcaecati ducimus animi! Veniam, odio. Eligendi quas
            natus, delectus id eum assumenda culpa ex sapiente, dolores iste
            quasi laudantium, vel similique dolore! Quae reprehenderit similique
            perferendis modi iusto cumque obcaecati eaque culpa quasi. Suscipit,
            itaque aut, quia in ab corporis nostrum nesciunt laborum velit ut
            quis fuga fugit! Nam ab consequatur qui! Doloribus possimus ducimus
            laboriosam, quae, voluptates et amet quisquam nobis reiciendis earum
            nam? Cupiditate tenetur, accusamus iusto debitis aspernatur
            recusandae pariatur repellat eligendi nam laudantium eaque
            repudiandae animi fuga labore. Omnis alias nisi minus ullam aliquid
            consectetur quaerat eum fuga ducimus! Explicabo a dolor ex
            temporibus veniam sed eum sapiente excepturi perferendis laborum,
            asperiores sint, rerum debitis, commodi modi tempora. Odit saepe
            laborum nisi tenetur totam incidunt explicabo magnam, eaque
            doloremque hic minus, dolores iure perspiciatis error at animi
            corrupti? Sapiente voluptatem quidem labore iure temporibus
            aspernatur non mollitia doloremque! Blanditiis aut incidunt amet
            eaque exercitationem id totam quas? Qui nam perspiciatis enim omnis
            beatae cumque repellendus dolore deserunt maxime, placeat labore
            iusto sint consequatur tempore excepturi sunt corporis eaque?
            Obcaecati distinctio deserunt assumenda nam ab accusamus, velit
            nulla, veritatis unde eveniet corporis ad itaque ipsum vel
            exercitationem dolor dolore ducimus natus soluta odio atque
            reiciendis! Deserunt architecto culpa reiciendis! Voluptas, alias
            consequatur modi vero, ad velit consequuntur repellat ut, veniam
            cupiditate omnis voluptatem. Quisquam velit alias, recusandae nulla
            tempora rem aliquam laborum culpa unde autem explicabo atque et
            dignissimos. Quibusdam nisi animi, sunt earum officiis molestiae.
            Deserunt illum adipisci porro minima neque tempore possimus,
            molestiae voluptatum blanditiis expedita. Sit tempora sed nihil quod
            labore voluptatibus blanditiis vitae aliquid excepturi? Temporibus
            deleniti veritatis doloribus quaerat, aut dolores, earum dolorem
            sint quas eos sed, natus quidem cumque magnam. Accusamus maxime
            vitae facere! Unde facere in nobis modi amet illum rem quo. Nam
            consequatur et, expedita ex velit cupiditate voluptate, ut, nesciunt
            in delectus vel veniam tenetur praesentium libero! Eius quibusdam,
            quia est amet consequuntur sunt tenetur blanditiis hic sit, delectus
            totam. Odio saepe fugit perferendis libero, beatae soluta enim est
            nesciunt voluptates reiciendis qui repellat natus repellendus rem
            quisquam. Rem delectus veniam necessitatibus voluptates deserunt
            doloremque modi, distinctio sit sed id. Voluptatum molestias at modi
            explicabo id vero sed natus distinctio! Quis possimus dicta
            deserunt, ratione non nostrum natus quae voluptatem ipsam laboriosam
            deleniti cupiditate magnam nisi doloribus quos cum eos. Harum dolor
            nobis odit tempore debitis illo voluptatem? Sit tenetur consequuntur
            officiis quo distinctio accusantium culpa perferendis nihil, esse,
            minima, non sint dolores recusandae aliquid similique repudiandae.
            Hic, ad placeat. Fugiat cumque vitae, molestias molestiae natus
            illum sunt nobis modi doloremque, inventore explicabo recusandae
            blanditiis, ipsa ea voluptatibus. Voluptas, autem. Enim, atque
            corporis libero sed vitae reprehenderit ad ex dolorum! Sapiente
            reprehenderit ea ut deserunt qui exercitationem placeat blanditiis
            voluptatem fuga repellat odio, tenetur numquam. Numquam magnam
            provident, officiis quibusdam pariatur optio ipsa quaerat veniam sed
            aliquid expedita quidem at! Eligendi ipsa magnam corporis earum
            officia consequuntur id possimus facere quibusdam! Aliquid ipsam
            quae voluptatem, voluptate natus in nulla provident aperiam
            aspernatur velit placeat, enim voluptates voluptatum repellat
            reprehenderit culpa. Excepturi beatae hic cum totam veniam
            consequuntur modi molestiae quos blanditiis? Nam nemo enim, beatae,
            nesciunt sed accusamus ipsam commodi, deleniti exercitationem
            doloribus quo dignissimos veniam amet expedita error neque. Atque
            aliquid dolor dolorum illo. Sit totam delectus harum explicabo cum.
            Temporibus magnam similique placeat vitae, omnis, natus voluptatibus
            praesentium culpa nobis repellendus unde ducimus minima eaque
            voluptas debitis consequuntur? Recusandae expedita molestias, enim
            sit pariatur quod officia eligendi eos, laborum illo culpa vero
            nostrum itaque repellat tempora dolore voluptates sed non nisi.
            Nihil quidem eaque quis dignissimos, expedita voluptates? Fugiat
            suscipit, tempore minus distinctio earum voluptatem sapiente ducimus
            possimus ipsum omnis sunt veritatis repellendus! Saepe dolor alias,
            doloribus tenetur non dolorum officiis quis. Libero odit expedita
            quaerat ipsam. Illo. Voluptates, numquam. Ea, dolor perferendis
            debitis ad nostrum quis vero illum molestias dolorum quae quo
            laudantium earum nesciunt autem accusamus rerum eaque. Qui autem ab
            magni dicta id, eveniet incidunt. Aliquam laborum rem itaque
            deleniti adipisci, excepturi facere tempora veniam eius omnis nulla
            possimus ratione corrupti fugit id, iusto voluptate obcaecati soluta
            laudantium quis enim. Ut adipisci tenetur culpa illum! Quaerat
            voluptates eos vel rem hic officia ex non sit dolores fugiat, animi
            odio odit iusto, ducimus iure tenetur consectetur similique
            explicabo tempore perferendis. Nemo molestias iusto deserunt ullam
            laudantium. Ducimus natus architecto soluta nesciunt culpa assumenda
            praesentium consequatur ab, ratione impedit aperiam aliquam neque
            incidunt vel voluptatibus ad minima recusandae nam at accusantium,
            hic fugiat esse atque? Ut, libero. Maiores neque veritatis, aut at
            impedit voluptatum numquam accusantium ab deserunt suscipit ut
            inventore architecto velit tempore distinctio voluptatem fuga omnis
            dolore sint? Soluta hic autem molestiae excepturi fugit quae.
            Eligendi suscipit quas magni laborum rerum. Explicabo, quo pariatur,
            sit repellat doloremque ab ratione earum dolore cum amet officia
            voluptates totam sint blanditiis veritatis non vel odit. Tempore,
            aut quisquam. Iste consequuntur maxime nobis, quibusdam nesciunt
            incidunt itaque rem alias sunt labore sed quae cumque esse saepe
            officiis blanditiis temporibus totam ut odio eaque possimus iusto?
            Eaque quaerat mollitia repudiandae. Voluptatem, minima? Voluptate
            sit recusandae atque unde odit sapiente ratione sunt doloribus nam
            cum voluptates totam, impedit ea praesentium dolorum numquam nisi
            labore. Id provident aut nisi sequi minima nostrum. Maxime,
            molestias adipisci. Deleniti in atque voluptatem omnis esse commodi
            quibusdam labore temporibus, earum sint ex tempora ullam asperiores
            distinctio natus dolorem alias ea doloremque at impedit praesentium,
            ducimus perspiciatis? Quis, iste! Dolorum assumenda magnam dicta
            reprehenderit, sunt ab tenetur iusto soluta pariatur amet delectus
            ea alias molestias vero optio dolore vitae laborum. Placeat dolorem
            quo voluptatem cum rem harum! Molestiae necessitatibus natus quia
            reprehenderit aut, ipsum alias corrupti consequatur cupiditate
            rerum, molestias, esse officia quod illum exercitationem qui est rem
            possimus? Esse quam aperiam deleniti? Odit modi id aliquam! Odit aut
            necessitatibus vitae architecto eius blanditiis fuga sed, placeat
            suscipit tempora deleniti unde, soluta est provident ut non!
            Deleniti quia tenetur ullam totam! Nulla alias ipsam ad nostrum
            sunt! Ducimus impedit, unde natus eum similique laboriosam aliquid
            blanditiis repudiandae perferendis accusantium saepe temporibus ipsa
            ullam officiis. Repellendus exercitationem ad praesentium aut
            officia odit temporibus, atque delectus rem! Soluta, unde? Sequi
            provident nesciunt dolorem cum quos ea eligendi quod. Tempore neque
            laudantium consectetur, eaque assumenda quas cupiditate voluptate
            saepe iste quasi facere quae numquam vitae laboriosam dignissimos
            illum, dicta doloribus. Expedita, natus qui voluptatem atque quia,
            quo incidunt veniam quam vero dignissimos repudiandae culpa facilis
            labore explicabo voluptatum. Accusamus sapiente corporis vitae
            veniam, in dolor facilis ipsam voluptatem. Sed, repellendus.
            Excepturi nihil voluptatum consectetur laboriosam ut repellat
            perspiciatis perferendis ipsum repudiandae expedita unde doloribus,
            exercitationem at asperiores rerum esse sequi eaque ducimus odio
            quia omnis magni, distinctio atque voluptates. Odit. Id ipsam
            similique quibusdam tempore asperiores commodi placeat quaerat
            debitis! Veritatis nihil cupiditate et dolore sunt adipisci odit
            magnam? Id accusamus alias dolorum dolores non necessitatibus odio
            omnis, iusto exercitationem? Aspernatur rem nobis laborum autem
            molestiae. Odio vitae quidem eaque tenetur ipsa non quam, excepturi
            reiciendis, error eius sapiente quas culpa accusantium voluptate
            harum obcaecati fuga ea, quos mollitia. Mollitia. Placeat officia
            quae et porro. Dolor labore quidem ducimus dignissimos corrupti
            pariatur maiores suscipit, veniam, odit deserunt quam eos totam
            dolorum porro unde nobis voluptatem commodi a nesciunt impedit
            libero? Facilis veritatis ullam laudantium ipsam, unde vel saepe
            vitae iusto praesentium fugiat placeat ducimus quod eveniet nihil
            fuga nisi hic, soluta eius ab? Provident amet facere nulla, animi
            nihil dolore. Aperiam, recusandae fugit veritatis quo illo magnam
            beatae officiis, alias cumque optio est exercitationem nihil sequi
            error natus quod. Inventore qui fugit architecto impedit. Vel amet
            similique veritatis voluptas aliquam! Dolores itaque, amet
            accusamus, tempore neque aperiam quaerat qui blanditiis odit
            cupiditate soluta explicabo ab eligendi? Neque est ipsam, tenetur
            officiis iste expedita debitis quidem aspernatur voluptatum nisi
            laborum repellat! Libero perferendis vitae amet beatae? Ratione
            minima, quia tempore quis neque quasi repudiandae esse corporis
            ullam delectus sapiente ab a eius voluptate id maiores aperiam
            incidunt nostrum fugiat! Dolor, alias! Cumque error necessitatibus
            voluptate distinctio amet. Molestias vitae blanditiis distinctio
            amet aperiam ipsa cupiditate ab fugit? Fugit illum quis doloremque
            eligendi beatae error ipsam corporis, quidem labore iusto
            consectetur voluptate! Officiis laudantium nostrum ipsum porro
            tenetur mollitia nemo minima aut vel aliquid rerum nulla saepe sunt,
            minus sequi dolorum quae? Vero facere minima, voluptatibus officia
            et asperiores? Unde, cumque eum? Velit, dolorem hic? Atque rem a
            dolor praesentium vitae libero sed ipsam repellendus reiciendis
            nesciunt, fugit aspernatur cupiditate ducimus molestias est eius non
            vel quia maxime inventore doloribus perferendis veniam? Assumenda,
            sequi tempora placeat dolore consectetur voluptatum quia voluptatem,
            tempore nam error dignissimos ducimus sint, quod iusto tenetur
            sapiente sit ea similique doloremque? Labore accusantium architecto
            quisquam rerum quibusdam quas. Minima totam eaque nisi consequatur
            incidunt adipisci, veniam quo debitis repudiandae quas harum quos
            voluptas ipsam atque vitae hic voluptates, magnam a corrupti?
            Quisquam deserunt fugit eos alias aliquid? Earum? Debitis earum
            fugit, voluptates non officia fugiat eius asperiores neque!
            Doloremque nisi temporibus animi, hic ut delectus, nostrum excepturi
            distinctio perferendis ipsa at cumque optio aut obcaecati tenetur?
            Nostrum, labore. Natus repudiandae, quam autem aspernatur quasi
            fugiat consectetur animi, dolorum velit sed vel nostrum adipisci
            ullam quia quisquam in ipsa. Ex totam et esse quisquam illum iusto
            odio, ut perferendis. Voluptatum beatae atque magni? Illum,
            voluptatibus? Cupiditate animi quo fuga corrupti obcaecati. Itaque
            illo et iste sed perferendis explicabo labore atque reiciendis a
            optio. Nobis in earum totam obcaecati nesciunt! Velit quasi
            repellendus atque qui quis? Quos soluta officia hic maiores totam.
            Voluptate rem impedit assumenda beatae mollitia? Cumque similique
            sed voluptatibus officiis voluptatum. Hic, ratione repellat!
            Eveniet, iusto sunt? Cupiditate hic aspernatur maxime blanditiis
            quibusdam velit ullam illum repudiandae, est, autem magnam deserunt
            nemo nulla ipsum officiis obcaecati dolor enim dignissimos non
            laborum ipsa sit illo sapiente vel. Aliquam. Temporibus ab explicabo
            impedit distinctio commodi. Eius provident quo rerum doloribus
            molestiae odio minus ea corrupti animi pariatur! Nobis corporis
            exercitationem veniam odio. Culpa natus ad unde, iusto maiores quos.
            Eligendi a labore blanditiis. Ullam quidem accusamus aliquid odit
            eaque, molestiae minus voluptas qui nesciunt quaerat corporis?
            Inventore fugit perspiciatis suscipit id. Veniam nesciunt esse rerum
            alias cupiditate repellat veritatis. Adipisci fuga ut incidunt,
            corrupti odit nisi magnam quaerat aperiam reprehenderit error
            dolorum vel voluptate. Cumque, voluptatibus qui commodi ab autem
            nisi magnam eius assumenda beatae, ut, quibusdam sed ad. Aut
            praesentium rem iste, nostrum non voluptatem tempore totam deserunt.
            Nesciunt explicabo veritatis asperiores pariatur consequuntur,
            eligendi quidem! Repudiandae dolore reprehenderit, assumenda
            doloremque eligendi corporis error iste id suscipit ipsum!
            Recusandae aliquam quasi sapiente? Error magnam et, debitis quas
            maiores nisi minima esse natus, quis provident quo optio facilis
            repellendus rem! Consequatur quae numquam sit sint ullam eos
            inventore eum. Rem eligendi aspernatur assumenda fugiat accusantium
            molestias ducimus tempore! Veniam ea, quidem in distinctio, sit nam
            obcaecati ad temporibus, eos deleniti repellat. Quas cum corporis
            aut adipisci illo hic a! Culpa officia fuga, illum delectus error
            dolores minima impedit rerum nobis nesciunt consequatur id ullam
            accusamus sequi sint dolorem expedita voluptate facere quibusdam
            nihil necessitatibus maxime. Eaque fugiat voluptatem enim!
            Obcaecati, error ducimus, quis iusto ipsum officiis perspiciatis
            cupiditate quod facere animi quae totam consectetur recusandae
            voluptates molestiae voluptatum, nobis consequatur! Harum deserunt
            aspernatur ex excepturi voluptates animi non consequatur.
          </h1>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
